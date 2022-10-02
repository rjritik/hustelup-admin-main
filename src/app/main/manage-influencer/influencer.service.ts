import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class influencerService {
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
    getallInfluencer(data) {
        return this._httpClient.post(`${environment.api}/influencerData/getInfluDataList`, data);
    }
    // getInfluenceDetail
    getInfluencersData(data) {
        return this._httpClient.post(`${environment.api}/influencerData/getInfluencerData`, data);
    }
    // changeInfluencerStatus
    changeInfluencerStatus(data) {
        return this._httpClient.patch(`${environment.api}/influencerData/changeInfluDataStatus`, data);
    }
    // getMenuCategory(data) {
    //     return this._httpClient.post(`${environment.api}/menuCategory/findMenuCategory`, data);
    // }


}
