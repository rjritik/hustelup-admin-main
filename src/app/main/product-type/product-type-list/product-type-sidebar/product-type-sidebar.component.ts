import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { productTypeService } from '../../productType.service';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-product-type-sidebar',
  templateUrl: './product-type-sidebar.component.html',
  styleUrls: ['./product-type-sidebar.component.scss']
})
export class ProductTypeSidebarComponent implements OnInit {

  loading: false;
  countryList: any;
  selectedCountry: any;
  title: any;
  selectedMenu: any;
  menulist: any;
  menuCategoryId: any;
  countryCode: any;
  subMenulist: any;
  selectedSubMenu: any;
  currentUser: any;

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

  constructor(private _coreSidebarService: CoreSidebarService,
    private _authenticationService: AuthenticationService,
    private productTypeService: productTypeService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }
  ngOnInit(): void {
    if (this.currentUser.role === 2) {
      this.selectedCountry = this.currentUser.countryCode;
      this.getMenuCategory();
    }
    else {
      this.productTypeService.getAllCountries().subscribe((res) => {
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
    this.productTypeService.getMenuCategory(data).subscribe((response) => {
      this.menulist = response['data'];
    })
  }
  getMenuSubCtaegory() {
    let data = { menuCategoryId: this.selectedMenu }
    this.productTypeService.getMenuSubCategory(data).subscribe((res) => {
      this.subMenulist = res['data'];
    })
  }
  getSubMenuCategoryId() {
  }
  addProductType(form) {
    if (form.valid) {
      let data = { menuSubCategoryId: this.selectedSubMenu, title: this.title, countryCode: this.selectedCountry }
      this.productTypeService.addProductType(data).subscribe((res) => {
        if (res['status'] === 201) {
          this.toggleSidebar('new-productType-sidebar');
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
