import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthenticationService } from 'app/auth/service';
import {ProductService} from '../product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
  public ColumnMode = ColumnMode;
  public selectedOption:any;
  rows: any;
  countryList: any;
  tempData: any;
  currentUser: any;
  selectedCountry: any;
  status: any;
  page=1;
  collectionSize: any;
  resData:any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _productService:ProductService,
    private _authenticationService: AuthenticationService, ) {
      this.selectedOption=10;
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    console.log("current user is",this.currentUser);
   }

  ngOnInit(): void {
   
    if (this.currentUser.role == 1) {
      this._productService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
        this.getProducts(0,this.page);
      })
    }
    else {
      this.selectedCountry = this.currentUser.countryCode;
      this.getProducts(0,this.page);
    }
  }
  getCountry() {
    this.getProducts(this.status,this.page);
  }
  async getProducts(status,page)
  {
    this.status=status;
    this.page=page;
    const params={status,page:this.page,limit:this.selectedOption,countryCode: this.selectedCountry};
    await this._productService.getAllProductStatusWise(params).subscribe((res:any)=>{
    this.rows=res?.data?.docs;
    this.collectionSize=res?.data?.totalDocs;
    this.resData=res?.data?.totalDocs;
  })
  }
  PageChanged(event)
  {
    this.page=event
    this.getProducts(this.status,this.page)
  }
  pageLimitChange()
  {
    this.selectedOption=parseInt(this.selectedOption);
    this.page=1;
    this.getProducts(this.status,this.page);
  }

}
