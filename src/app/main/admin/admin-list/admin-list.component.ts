import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { AdminListService } from './admin-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  collectionSize: any;
  pageNumber = 1;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
  constructor(
    private AdminListService: AdminListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // Filter Our Data 
    const temp = this.tempData.filter(function (d) {
      return (d.username.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.email.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.countryCode.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.countrydetails[0].name.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    let data = { pageNo: this.pageNumber }
    this.AdminListService.getAllAdmin(data).subscribe(response => {
      this.rows = response['data'];
      this.tempData = this.rows;
      this.collectionSize = response['count'];
      console.log("from admin",response);
    });
  }
  deleteAdmin(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Admin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let parms = {
          adminId: row._id,
        }
        this.AdminListService.deleteAdmin(parms).subscribe((response) => {
          const index: number = this.rows.indexOf(row);
          this.rows.splice(index, 1);
          this.rows = [...this.rows];
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
        }, err => {
          this.toastMixin.fire({
            icon: 'error',
            title: err
          });
        });
      }
    });
  }
  PageChanged(event) {
    this.pageNumber = event;
    this.getData();
  }
  pageLimitChange(event)
  {
    console.log(event);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
