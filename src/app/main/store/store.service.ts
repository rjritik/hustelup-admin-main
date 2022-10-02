import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class storeService {
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
    getallStoreList(data) {
        return this._httpClient.post(`${environment.api}/stores/getStoreLists`, data);
    }
    // getStoreDetail
    getStoreDetail(data) {
        return this._httpClient.post(`${environment.api}/stores/getStoreDetail`, data);
    }
    // changeStoreStatus
    changeStoreStatus(data) {
        return this._httpClient.patch(`${environment.api}/stores/changeStoreStatus`, data);
    }
    getMenuCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/findMenuCategory`, data);
    }


}
