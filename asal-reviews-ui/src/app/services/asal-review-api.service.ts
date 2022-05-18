import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import API_URLS from "src/app/config/API_URLS";

@Injectable({
  providedIn: "root",
})
export class AsalReviewAPIService {
  constructor(private http: HttpClient) {}

  public getCityData(data): Observable<any> {
    return this.http.post(API_URLS.GET_CITY, data);
  }

  public createAccount(data): Observable<any> {
    return this.http.post(API_URLS.CREATE_USER, data);
  }

  public login(data): Observable<any> {
    return this.http.post(API_URLS.SIGNIN_USER, data);
  }

  public logout(): Observable<any> {
    return this.http.get(API_URLS.SIGNOUT_USER);
  }

  public getUserDetails(id): Observable<any> {
    return this.http.get(API_URLS.GET_USER + id);
  }

  public createReview(data): Observable<any> {
    return this.http.post(API_URLS.CREATE_REVIEW, data);
  }

  public getReview(data): Observable<any> {
    return this.http.post(API_URLS.GET_REVIEW, data);
  }
}
