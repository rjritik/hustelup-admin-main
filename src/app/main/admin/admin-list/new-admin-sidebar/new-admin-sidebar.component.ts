import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { AdminListService } from '../admin-list.service';
@Component({
  selector: 'app-new-admin-sidebar',
  templateUrl: './new-admin-sidebar.component.html',
  styleUrls: ['./new-admin-sidebar.component.scss']
})
export class NewAdminSidebarComponent implements OnInit {
  public password;
  public username;
  public email;
  public passwordTextType: boolean;
  public country;
  public selectedCountry;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
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
  constructor(private _coreSidebarService: CoreSidebarService, private AdminListService: AdminListService) { }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  /**
   * Submit
   *
   * @param form
   */
  addNewAdmin(form) {
    if (form.valid) {
      const obj = {
        email: this.email,
        username: this.username,
        password: this.password,
        countryCode: this.selectedCountry
      };
      this.AdminListService.addAdmin(obj).subscribe((response) => {
        if (response['status'] === 201) {
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          form.resetForm();
          this.getData.emit();
          this.toggleSidebar('new-user-sidebar');
        }
        else {
          form.resetForm();
          this.toastMixin.fire({
            icon: 'error',
            title: 'something went wrong!'
          });
        }
      }, err => {
        this.toastMixin.fire({
          icon: 'error',
          title: err['message']
        });
      });
    }
  }
  ngOnInit(): void {
    this.AdminListService.getAllCountries().subscribe(response => {
      if (response['status'] === 200) {
        this.country = response['data'];
      }
    });
  }
}
