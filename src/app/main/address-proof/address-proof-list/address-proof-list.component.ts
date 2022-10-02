import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { addressProofService } from '../address-proof.service';
import { AuthenticationService } from 'app/auth/service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-address-proof-list',
  templateUrl: './address-proof-list.component.html',
  styleUrls: ['./address-proof-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddressProofListComponent implements OnInit {
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  selectedCountry: any;
  countryList: any;
  currentUser: any;
  public temp = [];
  collectionSize: any;
  pageNumber = 1;
  SingleRow: any;
  selectedindex: any;
  title: any;
  tempData: any;
  // Decorator
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
  @ViewChild(DatatableComponent) table: DatatableComponent;;
  constructor(private addressProofService: addressProofService,
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal,
    private _authenticationService: AuthenticationService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    if (this.currentUser.role !== 1) {
      this.selectedCountry = this.currentUser.countryCode;
    }
    else {
      this.addressProofService.getAllCountries().subscribe((res) => {
        this.countryList = res['data'];
      })
    }
    // this.getData();
  }
  getData() {
    let data = { countryCode: this.selectedCountry }
    this.addressProofService.getAllAddressProof(data).subscribe((res) => {
      this.rows = res['data'];
      this.tempData = this.rows;
    })

  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // Filter Our Data 
    const temp = this.tempData.filter(function (d) {
      return (d.proofName.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;

  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  openModal(modal, row) {
    this.SingleRow = { ...row };
    this.selectedindex = this.rows.indexOf(row);
    this.title = row.title;
    this.modalService.open(modal, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  editAddressProof(form) {
    if (form.valid) {
      let data = { proofId: this.SingleRow._id, proofName: this.SingleRow.proofName }
      this.addressProofService.updateAddressProof(data).subscribe((response) => {
        if (response['status'] == 200) {
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
          this.rows[this.selectedindex].proofName = response['proofName'];
          this.rows = [...this.rows];
          this.modalService.dismissAll();
        }
      }, (err) => {
        this.toastMixin.fire({
          title: err,
          icon: 'error'
        });
      })
    }
    else {
      return false;
    }
  }
  deleteAddressProof(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this Address Proof ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        let parms = {
          proofId: id,
        }
        this.addressProofService.deleteAddressProof(parms).subscribe((response) => {
          // const index: number = this.rows.indexOf(row);
          this.rows.splice(id, 1);
          this.rows = [...this.rows];
          this.toastMixin.fire({
            animation: true,
            title: response['message']
          });
        }, err => {
          this.toastMixin.fire({
            icon: 'error',
            title: err
          });
        });
      }
    });
  }
}
