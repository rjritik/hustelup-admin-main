import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/users-data').subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  addAdmin(data) {
    return this._httpClient.post(`${environment.api}/admin/createAdmin`, data);
  }
  getAllAdmin(data) {
    return this._httpClient.post(`${environment.api}/admin/viewAllAdmin`, data);
  }
  deleteAdmin(data) {
    return this._httpClient.post(`${environment.api}/admin/deleteAdmin`, data);
  }
  getSingleAdmin(data) {
    return this._httpClient.post(`${environment.api}/admin/viewAdminDetails`, data)
  }
  updateAdmin(data) {
    return this._httpClient.patch(`${environment.api}/admin/updateAdminDetails`, data)
  }
  getAllCountries() {
    return this._httpClient.get(`${environment.api}/country/getCountry`);
  }
}
