import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { brandService } from '../brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandListComponent implements OnInit {

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
    private brandService: brandService,
    private modalService: NgbModal) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.getBrand(1);
    if (this.currentUser.role == 1) {
      this.brandService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
      this.status = 1;
      // this.getStore(1);
    }
    else {
      this.selectedCountry = this.currentUser.countryCode;
      this.getBrand(1);
    }
  }
  getCountry() {
    this.getBrand(this.status);
  }
  getBrand(status) {
    this.status = status;
    let data = { status: this.status, countryCode: this.selectedCountry, pageNo: this.pageNumber }
    this.brandService.getallbrandList(data).subscribe((res) => {
      this.rows = res['data'];
      this.tempData = this.rows;
      this.collectionSize = res['count'];
    })

  }
  SearchCategory(event) {
    console.log(event.target.value);

  }
  toggleSidebar(name): void {
    // this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

}
