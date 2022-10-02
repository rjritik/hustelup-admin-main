import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { productTypeService } from '../productType.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductTypeListComponent implements OnInit {
  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  menuCategory: any;
  selectedCountry: any
  countryList: any;
  menulist: any;
  subMenulist: any
  selectedSubMenu: any;
  rows: any;
  tempData: any;
  SingleRow: any;
  selectedindex: any;
  title: any;
  currentUser: any;

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
    private productTypeService: productTypeService,
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
      this.productTypeService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
    }
  }
  getMenuCategory() {
    let data = { countryCode: this.selectedCountry }
    this.productTypeService.getMenuCategory(data).subscribe((response) => {
      this.menulist = response['data'];
    })
  }
  getMenuSubCategory() {
    let data = { menuCategoryId: this.menuCategory }
    this.productTypeService.getMenuSubCategory(data).subscribe((res) => {
      this.subMenulist = res['data'];
    })
  }
  getData() {
    let data = { menuSubCategoryId: this.selectedSubMenu }
    this.productTypeService.findProductType(data).subscribe((res) => {
      this.rows = res['data'];
      this.tempData = this.rows;
    })
  }
  checkStatus(row, e) {
    const obj = {
      id: row._id,
      status: e.target.checked
    };
    const index = this.rows.indexOf(row);
    this.productTypeService.activeDeactiveProductsType(obj).subscribe(res => {
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
  deleteProductType(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Product Type ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let parms = {
          id: row._id,
        }
        this.productTypeService.deleteProductType(parms).subscribe((response) => {
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
    this.modalService.open(modal, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  editProductType(form) {
    if (form.valid) {
      const data = { id: this.SingleRow._id, title: this.SingleRow.title }
      this.productTypeService.updateProductType(data).subscribe((response) => {
        if (response['status'] == 200) {
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          this.rows[this.selectedindex].title = response['title'];
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
  toggleSidebar(name) {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }


}
