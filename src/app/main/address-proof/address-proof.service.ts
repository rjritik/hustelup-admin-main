import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class addressProofService {
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
    addAddressProof(data) {
        return this._httpClient.post(`${environment.api}/addressProof/addAddressProof`, data);
    }
    getAllAddressProof(data) {
        return this._httpClient.post(`${environment.api}/addressProof/getAddressProofList`, data);
    }
    updateAddressProof(data) {
        return this._httpClient.patch(`${environment.api}/addressProof/updateAddressProof`, data);
    }
    // deleteAddressProof
    deleteAddressProof(data) {
        return this._httpClient.post(`${environment.api}/addressProof/deleteAddressProof`, data);
    }


}
