import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../category.service';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent implements OnInit {
  category: any;
  selectedCountry: any;
  loading: any;
  countryList: any;
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
    private categoryService: CategoryService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.categoryService.getAllCountries().subscribe((response: any) => {
      this.countryList = response['data'];
    });
    if (this.currentUser.role == 2) {
      this.selectedCountry = this.currentUser.countryCode;
    }
  }
  toggleSidebar(name): void {
    this.loading = false;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  addCategory(form) {
    if (form.valid) {
      let data = {
        title: this.category,
        countryCode: this.selectedCountry
      }
      this.categoryService.addCategory(data).subscribe((response) => {
        if (response['status'] === 201) {
          this.toggleSidebar('new-category-sidebar');
          this.toastMixin.fire({
            animation: true,
            title: response['message']
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
    else {
      return false;
    }
  }

}
