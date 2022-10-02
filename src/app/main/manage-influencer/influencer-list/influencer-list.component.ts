import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { influencerService } from '../influencer.service'
import {GlobalVar} from '../../../../assets/global_var'

@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfluencerListComponent implements OnInit {
  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  rows: any;
  tempData: any;
  currentUser: any;
  selectedCountry: any;
  countryList: any;
  status: any;
  viewData: any;
  collectionSize: any;
  pageNumber = 1;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _coreSidebarService: CoreSidebarService,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private influencerService: influencerService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }
  ngOnInit(): void {
    if (this.currentUser.role == 1) {
      this.influencerService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
        console.log("country data",res);
      })
      this.status = 1;
    }
    else {
      this.selectedCountry = this.currentUser.countryCode;
      this.getInfluencer(1);
    }

  }
  getCountry() {
    this.getInfluencer(this.status);
  }
  getInfluencer(status) {
    this.status = status;
    let data = { status: this.status, countryCode: this.selectedCountry, page: this.pageNumber,limit:GlobalVar.limit}
    this.influencerService.getallInfluencer(data).subscribe((res) => {
      this.rows = res['data'].docs;
      this.tempData = this.rows;
      this.collectionSize = res['count'];
    })
  }

  toggleSidebar(name): void {
    // this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  PageChanged(event) {
    this.pageNumber = event;
    // this.getInfluencer(this.status);
  }

}
