import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {Subject} from 'rxjs';

import {CoreConfigService} from '@core/services/config.service';
import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';

import {CountryService} from './country.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CountryComponent implements OnInit, AfterViewInit {
// Public
    public rows;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public country;

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
    public searchValue = '';

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // Private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {UserListService} _userListService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private CountryService: CountryService,
        private _coreSidebarService: CoreSidebarService,
        private _coreConfigService: CoreConfigService
    ) {
        this._unsubscribeAll = new Subject();
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {

        const val = event.target.value.toLowerCase();

        // Filter Our Data & Update The Rows
        this.rows = this.tempData.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // Whenever The Filter Changes, Always Go Back To The First Page
        this.table.offset = 0;
    }

    deleteCountry() {
        console.log("hello");
        Swal.fire({
            title: 'Are you sure?',
            text: 'you want to delete this Country ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.toastMixin.fire({
                    title: 'Country deleted successfully',
                    animation: true,
                });
            }
        });
    }

    addCountry(form) {
        if (form.valid) {
            const obj = {
                name: this.country.name,
                countryCode: this.country.alpha2Code,
                dialCode: this.country.callingCode,
            }
            console.log(obj);
            this.CountryService.addCountry(obj).subscribe(res => {
                if (res['status'] === 201) {
                    this.toastMixin.fire({
                        animation: true,
                        title: res['message']
                    });
                    this.rows.unshift(res['data']);
                    this.rows = [...this.rows];
                    console.log(res);
                } else {
                    this.toastMixin.fire({
                        icon: 'error',
                        title: res['message']
                    });
                }
            }, err => {
                this.toastMixin.fire({
                    icon: 'error',
                    title: 'something went wrong!'
                });
            });
        }
    }

    checkStatus(row, e) {
        const obj = {
            id: row._id,
            status: e.target.checked
        };
        const index = this.rows.indexOf(row);
        this.CountryService.activeDeactiveCountry(obj).subscribe(res => {
            if (res['status'] === 200) {
                this.toastMixin.fire({
                    animation: true,
                    title: res['message']
                });
                this.rows[index].status = obj.status;
            } else {
                this.toastMixin.fire({
                    icon: 'error',
                    title: res['message']
                });
            }
        }, err => {
            this.toastMixin.fire({
                icon: 'error',
                title: 'something went wrong!'
            });
        });
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        this.CountryService.getAllCountries().subscribe((response) => {
            console.log(response);
            this.rows = response['data'];
            this.tempData = this.rows;
        })
    }

    ngAfterViewInit() {
        const infix = <HTMLElement>document.querySelector('.mat-form-field-infix');
        infix.style.border = 'none';
        infix.style.padding = '16px 0 10px 0';
        const wrapper = <HTMLElement>document.querySelector('.mat-form-field-wrapper');
        wrapper.style.paddingBottom = '0px';
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
