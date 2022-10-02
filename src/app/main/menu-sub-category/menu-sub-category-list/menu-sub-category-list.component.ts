import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { menuSubCategoryService } from '../menuSubCategory.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
@Component({
  selector: 'app-menu-sub-category-list',
  templateUrl: './menu-sub-category-list.component.html',
  styleUrls: ['./menu-sub-category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuSubCategoryListComponent implements OnInit {
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
  columns:any;

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
  columnsList:any = [{ columns:1 }, {columns:2},{columns:3},{columns:4},{columns:5},{columns:6},
  ]
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _coreSidebarService: CoreSidebarService,
    private menuSubCategoryService: menuSubCategoryService,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role !== 1) {
      this.selectedCountry = this.currentUser.countryCode;
      this.getMenuCategory();
    }
    else {
      this.menuSubCategoryService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
    }
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  getMenuCategory() {
    let data = { countryCode: this.selectedCountry }
    this.menuSubCategoryService.getMenuCategory(data).subscribe((response) => {
      this.menulist = response['data'];
    })
  }
  getData() {
    let data = { menuCategoryId: this.menuCategory }
    this.menuSubCategoryService.findMenuSubCategory(data).subscribe((res) => {
      this.rows = res['data'];
      this.tempData = this.rows;
    })

  }
  SearchCategory(event) {
    const val = event.target.value.toLowerCase();

    // Filter Our Data 
    const temp = this.tempData.filter(function (d) {
      return (d.title.toLowerCase().indexOf(val) !== -1 || !val)

    });
    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }
  checkStatus(row, e) {
    const obj = {
      id: row._id,
      status: e.target.checked
    };
    const index = this.rows.indexOf(row);
    this.menuSubCategoryService.activeDeactiveMenuSubCategories(obj).subscribe(res => {
      if (res['status'] === 200) {
        this.toastMixin.fire({
          animation: true,
          title: res['message']
        });
        this.rows[index].status = obj.status;
      } else {
        this.toastMixin.fire({
          icon: 'error',
          title: res['message']
        });
      }
    }, err => {
      this.toastMixin.fire({
        icon: 'error',
        title: 'something went wrong!'
      });
    });

  }
  deleteSubCategory(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Sub Category ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value){
        let parms = {
          id: row._id,
        }
        this.menuSubCategoryService.deleteSubCategory(parms).subscribe((response) => {
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
    this.columns = row.menuColumn
    this.modalService.open(modal, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  editSubCategory(form){
    if (form.valid) {
      const data = { id: this.SingleRow._id, title: this.SingleRow.title, menuColumn: this.SingleRow.menuColumn }
      this.menuSubCategoryService.updateMenuSubCategory(data).subscribe((response) => {
        if (response['status'] == 200){
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          this.rows[this.selectedindex].title = response['title'];
          this.rows[this.selectedindex].menuColumn = response['menuColumn'];
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
    else {
      return false;
    }
  }
}