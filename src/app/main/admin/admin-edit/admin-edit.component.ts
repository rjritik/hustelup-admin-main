import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminListService } from '../admin-list/admin-list.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  username: any;
  email: any;
  password: any;
  urlLastValue: any;
  public url = this.router.url;
  row: any;
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
  constructor(private AdminListService: AdminListService, private router: Router) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }
  ngOnInit(): void {
    const data = { adminId: this.urlLastValue };
    this.AdminListService.getSingleAdmin(data).subscribe((response) => {
      this.row = response['data'];
      this.username = this.row.username;
      this.email = this.row.email;
      // this.password = this.row.pas;
    })
  }
  editadmin(form, id) {
    if (form.valid) {
      let data = {
        adminId: id,
        email: this.email,
        username: this.username,
        password: this.password
      }
      this.AdminListService.updateAdmin(data).subscribe((response) => {
        if (response['status'] == 200) {
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          this.router.navigate(['admin']);
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
