import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { colorService } from '../color.service';
@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorsListComponent implements OnInit {

  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  selectedCountry: any;
  countryList: any;
  menulist: any;
  menuCategory: any;
  rows: any;
  tempData: any;
  SingleRow: any;
  selectedindex: any;
  title: any;
  currentUser: any;
  color1: any;
  colorValue: any;

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
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _coreSidebarService: CoreSidebarService,
    private _authenticationService: AuthenticationService,
    private colorService: colorService,
    private modalService: NgbModal) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.getData()
  }
  SearchCategory(event) {
    const val = event.target.value.toLowerCase();
    // Filter Our Data 
    const temp = this.tempData.filter(function (d) {
      return (d.colorName.toLowerCase().indexOf(val) !== -1 || !val) ||
        (d.colorCode.toLowerCase().indexOf(val) !== -1 || !val)
    });
    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }
  getData() {
    this.colorService.getAllColor().subscribe((res) => {
      this.rows = res['data'];
      this.tempData = this.rows;
    })
  }
  deleteColor(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Color ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let parms = {
          colorId: row._id,
        }
        this.colorService.deleteColor(parms).subscribe((response) => {
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
  openModal(modal, row) {
    this.SingleRow = { ...row };
    this.selectedindex = this.rows.indexOf(row);
    this.title = row.title;
    this.color1 = this.SingleRow.colorCode;
    this.colorValue = this.SingleRow.colorCode;
    this.modalService.open(modal, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  editColor(form) {
    if (form.valid) {
      let data = { colorId: this.SingleRow._id, colorName: this.SingleRow.colorName, colorCode: this.colorValue }
      this.colorService.updateColor(data).subscribe((res) => {
        if (res['status'] == 200) {
          this.toastMixin.fire({
            animation: true,
            title: res['message']
          });
          this.rows[this.selectedindex].colorName = res['colorName'];
          this.rows[this.selectedindex].colorCode = res['colorCode'];
          this.rows = [...this.rows];
          this.modalService.dismissAll();
        }
      }, (err) => {
        this.toastMixin.fire({
          title: err,
          icon: 'error'
        });
      })
    }
  }
  public onChangeColor(color: string) {
    this.colorValue = color;
  }
  getColorCode(event) {
    const val = event.target.value
    this.color1 = val;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
}
