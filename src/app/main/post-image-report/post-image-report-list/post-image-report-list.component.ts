import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'app/auth/service';
import { postImageReportService } from '../postImageReport.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-post-image-report-list',
  templateUrl: './post-image-report-list.component.html',
  styleUrls: ['./post-image-report-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostImageReportListComponent implements OnInit {
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
  constructor(private _authenticationService: AuthenticationService,
    private postImageReportService: postImageReportService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role == 1) {
      this.postImageReportService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
      // this.status = 1;
    } else if(this.currentUser.role == 2) {
      this.selectedCountry = this.currentUser.countryCode;
    }
    this.getPostReport(0);
  }

  getCountry() {
    this.getPostReport(this.status);
  }

  pageLimitChange(){
    this.getPostReport(this.status);
  }

  getPostReport(type) {
    this.rows = [];
    this.status = type
    let data = { countryCode: this.selectedCountry, status: this.status, page: this.pageNumber,limit:this.selectedOption }
    this.postImageReportService.getAllPostImagesReports(data).subscribe((res:any) => {
      if(res.status === 200){
        this.rows = res.data.docs;
        this.tempData = this.rows;
        this.collectionSize = this.rows['count'];
      }else{
        this.toastMixin.fire({
          icon: 'error',
          title: res['message']
        });
      }
    })
  }

  PageChanged(event) {
    this.pageNumber = event;
    this.getPostReport(this.status);
  }
}
