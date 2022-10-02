import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class menuSubCategoryService {
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

    getAllCountries() {
        return this._httpClient.get(`${environment.api}/country/getCountry`);
    }
    getMenuCategory(data) {
        return this._httpClient.post(`${environment.api}/menuCategory/findMenuCategory`, data);
    }
    addSubCategory(data) {
        return this._httpClient.post(`${environment.api}/menuSubCategory/addMenuSubCategory`, data);
    }
    getAllAdmin() {
        return this._httpClient.get(`${environment.api}/admin/viewAllAdmin`);
    }
    findMenuSubCategory(data) {
        return this._httpClient.post(`${environment.api}/menuSubCategory/findMenuSubCategory`, data);
    }
    activeDeactiveMenuSubCategories(data) {
        return this._httpClient.patch(`${environment.api}/menuSubCategory/activeDeactiveMenuSubCategory`, data);
    }
    //activeDeactiveMenuSubCategories 
    deleteSubCategory(data) {
        return this._httpClient.post(`${environment.api}/menuSubCategory/deleteMenuSubCategory`, data);
    }
    updateMenuSubCategory(data) {
        return this._httpClient.patch(`${environment.api}/menuSubCategory/updateMenuSubCategory`, data);
    }



}
