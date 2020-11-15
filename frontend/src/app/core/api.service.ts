import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/index';
import {ApiResponse} from '../model/api.response';
import {ApiResponseLogin} from '../model/api.response.login';
import {Bottle} from '../model/bottle.model';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  // baseUrl = 'http://167.172.36.88:9000/api/users/';
  baseUrl = 'http://localhost:9000/api/';
  baseUrlVehicle = 'http://localhost:9000/api/vehiclemodels/';
  baseUrlManufacturer = 'http://localhost:9000/api/manufacturers/';
  baseUrlTransaction = 'http://localhost:9000/api/transaction/';

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

  //------------------------------------









  getUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(this.baseUrlVehicle);
  }

  getManufacturers(): Observable<any> {
    return this.http.get<any>(this.baseUrlManufacturer);
  }

  getVehiclesSearchEvtype(evtype: number): Observable<any> {
    return this.http.get<any>(this.baseUrlVehicle + 'search/?evtype=' + evtype);
  }

  getTransaction(): Observable<any> {
    return this.http.get<any>(this.baseUrlTransaction);
  }

  getTransactionSpecificUser(userId: string): Observable<any> {
    return this.http.get<any>(this.baseUrlTransaction + 'search/?user=' + userId);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrlVehicle + id);
  }

  getManufacturerById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrlManufacturer + id);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrlTransaction + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, user);
  }
}
