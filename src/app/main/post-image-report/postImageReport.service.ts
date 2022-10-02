import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class postImageReportService {
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

    getAllPostImagesReports(data) {
        return this._httpClient.post(`${environment.api}/postImageReports/getAllPostImageReports`, data);
    }
    getPostImagesReports(data) {
        return this._httpClient.post(`${environment.api}/postImageReports/getPostImageReports`, data);
    }
    acceptRejectPostImageReports(data) {
        return this._httpClient.patch(`${environment.api}/postImageReports/acceptRejectPostImageReports`, data);
    }
}
