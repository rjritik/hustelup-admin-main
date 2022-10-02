import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationExtras, Router } from '@angular/router';
import { brandService } from '../../brand.service';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.scss']
})
export class BrandViewComponent implements OnInit {

  title: any;
  urlLastValue: any;
  rows: any = [];
  public url = this.router.url;
  reasion = false;
  Reasion: any;
  param: any;
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
  constructor(private router: Router,
    private brandService: brandService) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    const data = { brandId: this.urlLastValue };
    this.brandService.getBrandDetail(data).subscribe((res) => {
      this.rows = res['data'];
    })
  }
  changeBrandStatus(status) {
    if (status == 2) {
      this.reasion = true;
    }
    if (status == 1 || status == 2 && this.reasion == true && this.Reasion != undefined) {
      if (status == 1) {
        this.param = { brandId: this.urlLastValue, status }
      }
      else {
        this.param = { brandId: this.urlLastValue, status, disapprovalReason: this.Reasion }
      }
      this.brandService.changeBrandStatus(this.param).subscribe((res) => {
        if (res['status'] === 200) {
          this.toastMixin.fire({
            animation: true,
            title: res['message']
          });
          this.reasion = false;
        } else {
          this.toastMixin.fire({
            icon: 'error',
            title: res['message']
          });
        }
        this.router.navigate(['brand']);
      }, err => {
        this.toastMixin.fire({
          icon: 'error',
          title: 'something went wrong!'
        });
      });
    }
  }

}
