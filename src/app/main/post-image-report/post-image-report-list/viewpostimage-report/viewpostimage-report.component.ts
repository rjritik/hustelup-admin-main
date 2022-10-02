import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { postImageReportService } from '../../postImageReport.service';
@Component({
  selector: 'app-viewpostimage-report',
  templateUrl: './viewpostimage-report.component.html',
  styleUrls: ['./viewpostimage-report.component.scss']
})
export class ViewpostimageReportComponent implements OnInit {
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
  constructor(private router: Router, private postImageReportService: postImageReportService) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    let data = { postId: this.urlLastValue };
    this.postImageReportService.getPostImagesReports(data).subscribe((res) => {
      this.rows = res['data'];
      console.log("final data is---->",res);
      this.postId = this.rows[0].postId
    })
  }
  changeStatus(status) {
    let data = { postId: this.urlLastValue, status };
    this.postImageReportService.acceptRejectPostImageReports(data).subscribe((res) => {
      if (res['status'] === 200) {
        this.toastMixin.fire({
          animation: true,
          title: ['Reports accepted']
        });
      } else {
        this.toastMixin.fire({
          icon: 'error',
          title: ['Reports Rejected']
        });
      }
      this.router.navigate(['postImageReport']);
    }, err => {
      this.toastMixin.fire({
        icon: 'error',
        title: 'something went wrong!'
      });
    });
  }

}
