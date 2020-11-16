import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ApiResponseLogin} from '../model/api.response.login';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://54.152.103.77:9000/api/';

  login(loginPayload): Observable<ApiResponseLogin> {
    const loginToken = window.btoa(loginPayload.username + ':' + loginPayload.password);
    const hh = { Authorization:  'Basic ' +  loginToken };
    const requestParams = {
      headers: hh
    };
    return this.http.post<ApiResponseLogin>('http://54.152.103.77:9000/api/users/auth', {}, requestParams);
  }

  getBottles(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bottles/' + factoryID);
  }

  getFaults(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'faults/' + factoryID);
  }

  getBottlesByHour(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bottles/histogram/' + factoryID);
  }

  getFaultsByHour(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'faults/histogram/' + factoryID);
  }

  getBottlesByHourTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bottles/hourly/' + factoryID);
  }

  getFaultsByHourTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'faults/hourly/' + factoryID);
  }

  getBottlesByDayTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bottles/daily/' + factoryID);
  }

  getFaultsByDayTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'faults/daily/' + factoryID);
  }

  getBottlesTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'bottles/sum/' + factoryID);
  }

  getFaultsTotal(factoryID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'faults/sum/' + factoryID);
  }
}
