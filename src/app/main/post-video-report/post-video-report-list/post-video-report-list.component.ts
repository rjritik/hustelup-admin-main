import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'app/auth/service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import {PostVideoReportService} from '../post-video-report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-video-report-list',
  templateUrl: './post-video-report-list.component.html',
  styleUrls: ['./post-video-report-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostVideoReportListComponent implements OnInit {

  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  rows: any = [];
  tempData: any;
  currentUser: any;
  collectionSize: any;
  pageNumber = 1;
  type: any;
  selectedCountry: any;
  countryList: any;
  status: any;
  toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _authenticationService:AuthenticationService,
    private _PostVideoReportService:PostVideoReportService ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
   }
  ngOnInit(): void {
    if (this.currentUser.role == 1) {
      this._PostVideoReportService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
      // this.status = 1;
    }
    else {
      this.selectedCountry = this.currentUser.countryCode;
    }
    this.getPostReport(0);
  }

  getCountry(){
    this.getPostReport(this.status);
  }

  getPostReport(type) {
    this.status = type
    let data = { countryCode: this.selectedCountry, status: this.status, page: this.pageNumber,limit:this.selectedOption }
    this._PostVideoReportService.getAllPostVideoReports(data).subscribe((res:any) => {
      if (res['status'] === 200) {
        this.rows = res['data'].docs;
        this.tempData = this.rows;
        this.collectionSize = this.rows.count;
      } else {
        this.toastMixin.fire({
          icon: 'error',
          title: res['message']
        });
      }
    })
  }

  pageLimitChange(){
    this.getPostReport(this.status);
  }



}
