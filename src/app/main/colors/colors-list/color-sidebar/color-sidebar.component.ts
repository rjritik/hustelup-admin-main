import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { colorService } from '../../color.service'
import { AuthenticationService } from 'app/auth/service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-color-sidebar',
  templateUrl: './color-sidebar.component.html',
  styleUrls: ['./color-sidebar.component.scss']
})
export class ColorSidebarComponent implements OnInit, AfterViewInit {

  loading: false;
  countryList: any;
  selectedCountry: any;
  category: any;
  selectedMenu: any;
  menulist: any;
  menuCategoryId: any;
  countryCode: any;
  currentUser: any;
  color: any;
  colorName: any;
  selectColorVal: any;
  colorValue: any
  colorSelected = false;

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
  @Output() getData = new EventEmitter();
  public color1: string = '#2889e9';
  constructor(
    private cpService: ColorPickerService,
    private _authenticationService: AuthenticationService,
    private _coreSidebarService: CoreSidebarService,
    private colorService: colorService) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  }
  ngOnInit(): void {
    this.colorValue = this.color1;
  }
  public onChangeColor(color: string): Cmyk {
    this.colorSelected = true;
    // this.selectColorVal = color;
    this.colorValue = color;
    const hsva = this.cpService.stringToHsva(color);
    const rgba = this.cpService.hsvaToRgba(hsva);
    return this.cpService.rgbaToCmyk(rgba);
  }
  addColor(form) {
    // if (this.colorSelected == true) {
    //   this.colorValue = this.selectColorVal;

    // } else {
    //   this.colorValue = this.color1;
    // }
    if (form.valid) {
      let data = { colorName: this.colorName, colorCode: this.colorValue }
      this.colorService.addColor(data).subscribe((res) => {
        if (res['status'] === 201) {
          this.toggleSidebar('new-color-sidebar');
          this.toastMixin.fire({
            animation: true,
            title: ['Color Inserted !']
          });
          form.resetForm();
          this.getData.emit();
        }
      }, (err) => {
        this.toastMixin.fire({
          title: err['message'],
          icon: 'error'
        });
        form.resetForm();
      })
    }

  }
  getColorCode(event) {
    const val = event.target.value
    this.color1 = val;
  }
  toggleSidebar(name) {
    this.loading = false;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  ngAfterViewInit() {
    // this.colorValue = this.color1;
  }

}
