import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { influencerService } from '../../influencer.service';
@Component({
  selector: 'app-view-influencer',
  templateUrl: './view-influencer.component.html',
  styleUrls: ['./view-influencer.component.scss']
})
export class ViewInfluencerComponent implements OnInit {
  title: any;
  urlLastValue: any;
  rows: any;
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
  constructor(private router: Router,
    private influencerService: influencerService) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  ngOnInit(): void {
    const data = { influId: this.urlLastValue };
    this.influencerService.getInfluencersData(data).subscribe((res) => {
      this.rows = res['data'];
    })
  }
  changeInfluencerStatus(status) {
    const data = { influId: this.urlLastValue, status }
    this.influencerService.changeInfluencerStatus(data).subscribe((res) => {
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
      this.router.navigate(['influencer']);
    }, err => {
      this.toastMixin.fire({
        icon: 'error',
        title: 'something went wrong!'
      });
    });
  }

}
