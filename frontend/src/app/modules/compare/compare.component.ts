import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../core/api.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  dayLabels = [];
  dateLabels = [];
  factory1bottles = [];
  factory1faults = [];
  factory2bottles = [];
  factory2faults = [];
  f1bottlesTotal: number;
  f1faultsTotal: number;
  f2bottlesTotal: number;
  f2faultsTotal: number;

  bottlesDailyXf1 = [];
  bottlesDailyXf2 = [];
  faultsDailyXf1 = [];
  faultsDailyXf2 = [];
  bottlesDailyYf1 = [];
  bottlesDailyYf2 = [];
  faultsDailyYf1 = [];
  faultsDailyYf2 = [];

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getBottlesByDayTotal('factory-1')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory1bottles = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getBottlesByDayTotal('factory-2')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory2bottles = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getFaultsByDayTotal('factory-1')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory1faults = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getFaultsByDayTotal('factory-2')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory2faults = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getBottlesByHourTotal('factory-1')
      .subscribe( data => {
        this.bottlesDailyYf1 = data.map(item => Object.values(item)[0]);
        this.bottlesDailyXf1 = data.map(item => Object.values(item)[1]);
      });

    this.apiService.getBottlesByHourTotal('factory-2')
      .subscribe( data => {
        this.bottlesDailyYf2 = data.map(item => Object.values(item)[0]);
        this.bottlesDailyXf2 = data.map(item => Object.values(item)[1]);
      });

    this.apiService.getFaultsByHourTotal('factory-1')
      .subscribe( data => {
        this.faultsDailyYf1 = data.map(item => Object.values(item)[0]);
        this.faultsDailyXf1 = data.map(item => Object.values(item)[1]);
      });

    this.apiService.getFaultsByHourTotal('factory-2')
      .subscribe( data => {
        this.faultsDailyYf2 = data.map(item => Object.values(item)[0]);
        this.faultsDailyXf2 = data.map(item => Object.values(item)[1]);
      });

    this.apiService.getBottlesTotal('factory-1')
      .subscribe( data => {
        this.f1bottlesTotal = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getBottlesTotal('factory-2')
      .subscribe( data => {
        this.f2bottlesTotal = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getFaultsTotal('factory-1')
      .subscribe( data => {
        this.f1faultsTotal = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getFaultsTotal('factory-2')
      .subscribe( data => {
        this.f2faultsTotal = data.map(item => Object.values(item)[0]);
      });
  }

}
