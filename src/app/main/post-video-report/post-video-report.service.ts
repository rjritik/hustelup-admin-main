import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostVideoReportService {
  public onUserListChanged: BehaviorSubject<any>;
  constructor(private _httpClient: HttpClient) { }
  getAllCountries()
  {
    return this._httpClient.get(`${environment.api}/country/getCountry`);
  }
  getAllPostVideoReports(data)
  {
    return this._httpClient.post(`${environment.api}/postVideoReports/getAllPostVideoReports`,data);
  }
  viewPostVideoReports(data)
  {
    return this._httpClient.post(`${environment.api}/postVideoReports/getPostVideoReports`,data);
  }
  acceptRejectPostImageReports(data) {
    return this._httpClient.patch(`${environment.api}/postVideoReports/acceptRejectPostVideoReports`,data);
}
}
