import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { menuSubCategoryService } from '../../menuSubCategory.service';
import { AuthenticationService } from 'app/auth/service';
@Component({
  selector: 'app-menu-sub-category-sidebar',
  templateUrl: './menu-sub-category-sidebar.component.html',
  styleUrls: ['./menu-sub-category-sidebar.component.scss']
})
export class MenuSubCategorySidebarComponent implements OnInit {
  loading: false;
  countryList: any;
  selectedCountry: any;
  category: any;
  selectedMenu: any;
  menulist: any;
  menuCategoryId: any;
  countryCode: any;
  currentUser: any;
  menuColumn:any;
  columnsList:any = [{ columns:1 }, {columns:2},{columns:3},{columns:4},{columns:5},{columns:6}];

  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true
  });
  @Output() getData = new EventEmitter();
  constructor(private menuSubCategoryService: menuSubCategoryService,
    private _authenticationService: AuthenticationService,
    private _coreSidebarService: CoreSidebarService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role == 2) {
      this.selectedCountry = this.currentUser.countryCode;
      this.getMenuCategory();
    }
    else {
      this.menuSubCategoryService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
    }
  }
  toggleSidebar(name) {
    this.loading = false;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  getMenuCategory() {
    this.countryCode = this.selectedCountry;
    let data = { countryCode: this.countryCode }
    this.menuSubCategoryService.getMenuCategory(data).subscribe((response) => {
      this.menulist = response['data'];
    })

  }
  getSelectedMenu() {
    this.menuCategoryId = this.selectedMenu;
  }
  addSubCategory(form) {
    if (form.valid) {
      let data = { menuCategoryId: this.menuCategoryId, title: this.category, countryCode: this.countryCode, menuColumn: this.menuColumn }
      this.menuSubCategoryService.addSubCategory(data).subscribe((res) => {
        if (res['status'] === 201) {
          this.toggleSidebar('new-subCategory-sidebar');
          this.toastMixin.fire({
            animation: true,
            title: res['message']
          });
          form.resetForm();
          this.getData.emit();
        }
      }, (err) => {
        this.toastMixin.fire({
          title: err['message'],
          icon: 'error'
        });
        form.resetForm();
      })
    }
  }

}
