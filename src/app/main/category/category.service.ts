import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
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

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    //   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    //     return new Promise<void>((resolve, reject) => {
    //       Promise.all([this.getDataTableRows()]).then(() => {
    //         resolve();
    //       }, reject);
    //     });
    //   }

    /**
     * Get rows
     */
    //   getDataTableRows(): Promise<any[]> {
    //     return new Promise((resolve, reject) => {
    //       this._httpClient.get('api/users-data').subscribe((response: any) => {
    //         this.rows = response;
    //         this.onUserListChanged.next(this.rows);
    //         resolve(this.rows);
    //       }, reject);
    //     });
    //   }
    addCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/addMenuCategory`, data);
    }
    getAllAdmin() {
        return this._httpClient.get(`${environment.api}/admin/viewAllAdmin`);
    }
    getAllCountries() {
        return this._httpClient.get(`${environment.api}/country/getCountry`);
    }
    getAllCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/findMenuCategory`, data);
    }
    deleteCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/deleteMenuCategory`, data);
    }
    // findSingleCategory
    getSingleCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/findSingleCategory`, data);
    }
    // updateMenuCategory
    updateCategory(data) {
        return this._httpClient.patch(`${environment.api}/menuCategory/updateMenuCategory`, data);
    }
    activeDeactiveMenuCategory(data) {
        return this._httpClient.patch(`${environment.api}/menuCategory/activeDeactiveMenuCategory`, data);
    }

}
