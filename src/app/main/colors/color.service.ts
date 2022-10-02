import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class colorService {
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
    addColor(data) {
        return this._httpClient.post(`${environment.api}/colors/addColor`, data);
    }
    getAllColor() {
        return this._httpClient.get(`${environment.api}/colors/getColorList`);
    }
    updateColor(data) {
        return this._httpClient.patch(`${environment.api}/colors/editColor`, data);
    }
    deleteColor(data) {
        return this._httpClient.post(`${environment.api}/colors/deleteColor`, data);
    }



}
