import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }
  getAllCountries() {
    return this._httpClient.get(`${environment.api}/country/getCountry`);
  }
  getAllProductStatusWise(param: any) {
    return this._httpClient.post(`${environment.api}/products/getProductStatusWise`, param);
  }
  getProductById(productId) {
    return this._httpClient.post(`${environment.api}/products/getProductById`, productId)
  }
  changeProductStatus(params) {
    return this._httpClient.post(`${environment.api}/products/changeProductStatus`, params)
  }

}
