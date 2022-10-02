import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostVideoReportService } from '../post-video-report.service';

@Component({
  selector: 'app-view-post-video-report',
  templateUrl: './view-post-video-report.component.html',
  styleUrls: ['./view-post-video-report.component.scss']
})
export class ViewPostVideoReportComponent implements OnInit {

  title: any;
  urlLastValue: any;
  rows: any;
  postId: any;
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
  constructor(private _PostVideoReportService:PostVideoReportService,private router: Router) { }

  ngOnInit(): void {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    let data = { postId: this.urlLastValue };
    this._PostVideoReportService.viewPostVideoReports(data).subscribe((res) => {
      this.rows = res['data'];
      console.log("res data is--->",res);
      this.postId = this.rows[0].postId
    })
  }
  changeStatus(status) {
    let data = { postId: this.urlLastValue, status };
    this._PostVideoReportService.acceptRejectPostImageReports(data).subscribe((res) => {
      console.log("res data is",res);
      if (res['status'] === 200) {
        this.toastMixin.fire({
          animation: true,
          title: res['data'],
        });
      } else {
        this.toastMixin.fire({
          icon: 'error',
          title: res['data'],
        });
      }
      this.router.navigate(['postVideoReport']);
    }, err => {
      this.toastMixin.fire({
        icon: 'error',
        title: 'something went wrong!'
      });
   });
  }

}
