import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ApiResponseLogin} from '../model/api.response.login';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:9000/api/';

  login(loginPayload): Observable<ApiResponseLogin> {
    const loginToken = window.btoa(loginPayload.username + ':' + loginPayload.password);
    const hh = { Authorization:  'Basic ' +  loginToken };
    const requestParams = {
      headers: hh
    };
    return this.http.post<ApiResponseLogin>('http://localhost:9000/api/users/auth', {}, requestParams);
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
}
