import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsalReviewAPIService {

  constructor(
    private http: HttpClient) { }

  public getCityData(data): Observable<any> {
    return this.http.post('http://10.160.217.7:8081/master/v1/city', data);
}
}
