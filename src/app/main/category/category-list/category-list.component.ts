import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CategoryService } from '../category.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {

  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  selectedCountry: any;
  countryList: any;
  rows: any;
  public title;
  private tempData = [];
  SingleRow: any;
  selectedindex: any;
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
    private modalService: NgbModal, private _authenticationService: AuthenticationService,
    private categoryService: CategoryService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      countryCode: string,
    };
    if (typeof state !== 'undefined') {
      this.selectedCountry = state.countryCode;
    }
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role !== 1) {
      this.selectedCountry = this.currentUser.countryCode;
    }
    else {
      this.categoryService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
    }
    this.getData();
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
  getData() {
    let data = {
      countryCode: this.selectedCountry
    }
    this.categoryService.getAllCategory(data).subscribe((response) => {
      this.rows = response['data'];
      this.tempData = this.rows;
    })
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  deleteCategory(row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Category ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let parms = {
          id: row._id,
        }
        this.categoryService.deleteCategory(parms).subscribe((response) => {
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
  checkStatus(row, e) {
    const obj = {
      id: row._id,
      status: e.target.checked
    };
    const index = this.rows.indexOf(row);
    this.categoryService.activeDeactiveMenuCategory(obj).subscribe(res => {
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
  openModal(modal, row) {
    this.SingleRow = { ...row };
    this.selectedindex = this.rows.indexOf(row);
    this.title = row.title;
    this.modalService.open(modal, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  editcategory(form) {
    if (form.valid) {
      const data = { id: this.SingleRow._id, title: this.SingleRow.title }
      this.categoryService.updateCategory(data).subscribe((response) => {
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
}
