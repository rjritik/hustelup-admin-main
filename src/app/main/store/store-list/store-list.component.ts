import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { storeService } from '../store.service';
import { AuthenticationService } from 'app/auth/service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoreListComponent implements OnInit {
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
  constructor(private storeService: storeService,
    private _authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role == 1) {
      this.storeService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
      this.status = 1;
      // this.getStore(1);
    }
    else {
      this.selectedCountry = this.currentUser.countryCode;
      this.getStore(1);
    }
  }
  getCountry() {
    this.getStore(this.status);
  }
  searchStore(event) {
  }
  getStore(status) {
    this.status = status;
    let data = { status: this.status, countryCode: this.selectedCountry,  page: this.pageNumber,limit:10 }
    this.storeService.getallStoreList(data).subscribe((res) => {
      this.rows = res['data'];
      console.log(this.rows);
      this.tempData = this.rows;
      this.collectionSize = res['count'];
    })
  }
  viewStore(id, model) {
    if (id) {
      let data = { storeId: id }
      this.storeService.getStoreDetail(data).subscribe((res) => {
        this.viewData = res['data'];
        this.modalService.open(model, {
          centered: true,
          size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
        });

      })
    }
  }
  PageChanged(event) {
    this.pageNumber = event;
    this.getStore(this.status);
  }
}
