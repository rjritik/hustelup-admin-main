import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Swal from 'sweetalert2';
import { addressProofService } from '../../address-proof.service';
@Component({
  selector: 'app-address-proof-sidebar',
  templateUrl: './address-proof-sidebar.component.html',
  styleUrls: ['./address-proof-sidebar.component.scss']
})
export class AddressProofSidebarComponent implements OnInit {

  @Output() getData = new EventEmitter();
  proofName: any;
  selectedCountry: any;
  countryList: any;
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
  constructor(private _coreSidebarService: CoreSidebarService,
    private addressProofService: addressProofService) { }

  ngOnInit(): void {
    this.addressProofService.getAllCountries().subscribe((res) => {
      this.countryList = res['data'];
    })
  }
  addAddressProof(form) {
    if (form.valid) {
      let data = { proofName: this.proofName, countryCode: this.selectedCountry };
      this.addressProofService.addAddressProof(data).subscribe((res) => {
        if (res['status'] === 201) {
          this.toastMixin.fire({
            animation: true,
            title: ['Address Proof Inserted']
          });
          form.resetForm();
          this.getData.emit();
          this.toggleSidebar('app-address-proof-sidebar');
        }
        else {
          form.resetForm();
          this.toastMixin.fire({
            icon: 'error',
            title: 'something went wrong!'
          });
        }
      })
    }
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

}
