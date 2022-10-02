import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
@Injectable()
export class DashboardService {
  // Public
  public apiData: any;
  public onApiDataChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onApiDataChanged = new BehaviorSubject({});
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
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Api Data
   */
  getApiData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/dashboard-data').subscribe((response: any) => {
        this.apiData = response;
        this.onApiDataChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
  getAllCountry() {
    return this._httpClient.get(`${environment.api}/country/getCountry`);
  }
  getAllMenuCategory(data) {
    return this._httpClient.post(`${environment.api}/menuCategory/findMenuCategory`, data);
  }
}
