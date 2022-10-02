import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class brandService {
    public rows: any;
    public onUserListChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onUserListChanged = new BehaviorSubject({});
    }
    getAllCountries() {
        return this._httpClient.get(`${environment.api}/country/getCountry`);
    }
    // getallbrand list
    getallbrandList(data) {
        return this._httpClient.post(`${environment.api}/brands/getAllBrands`, data);
    }
    // getStoreDetail
    getBrandDetail(data) {
        return this._httpClient.post(`${environment.api}/brands/getBrandDetails`, data);
    }
    // changeBrandStatus
    changeBrandStatus(data) {
        return this._httpClient.patch(`${environment.api}/brands/changeBrandStatus`, data);
    }


}
