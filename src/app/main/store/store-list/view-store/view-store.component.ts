import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { storeService } from '../../store.service';

@Component({
  selector: 'app-view-store',
  templateUrl: './view-store.component.html',
  styleUrls: ['./view-store.component.scss']
})
export class ViewStoreComponent implements OnInit {
  title: any;
  urlLastValue: any;
  row: any;
  public url = this.router.url;
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
  constructor(private router: Router, private storeService: storeService) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    const data = { storeId: this.urlLastValue };
    this.storeService.getStoreDetail(data).subscribe((res) => {
      this.row = res['data'];
    })
  }
  changeStoreStatus(status) {
    const data = { storeId: this.urlLastValue, status }
    this.storeService.changeStoreStatus(data).subscribe((res) => {
      if (res['status'] === 200) {
        this.toastMixin.fire({
          animation: true,
          title: res['message']
        });
      } else {
        this.toastMixin.fire({
          icon: 'error',
          title: res['message']
        });
      }
      this.router.navigate(['store']);
    }, err => {
      this.toastMixin.fire({
        icon: 'error',
        title: 'something went wrong!'
      });
    });
  }
}
