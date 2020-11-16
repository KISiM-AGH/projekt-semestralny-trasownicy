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
  factory1bottles = [];
  factory1faults = [];
  factory2bottles = [];
  factory2faults = [];
  bottlesTotal = [];
  faultsTotal = [];

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getBottlesByDayTotal('factory-1')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory1bottles = data.map(item => Object.values(item)[0]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });
    this.apiService.getBottlesByDayTotal('factory-2')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory2bottles = data.map(item => Object.values(item)[0]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });
    this.apiService.getFaultsByDayTotal('factory-1')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory1faults = data.map(item => Object.values(item)[0]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });
    this.apiService.getFaultsByDayTotal('factory-2')
      .subscribe( data => {
        this.dayLabels = data.map(item => Object.values(item)[1]);
        this.factory2faults = data.map(item => Object.values(item)[0]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });
    this.apiService.getBottlesTotal('factory-1')
      .subscribe( data => {
        this.bottlesTotal.push(data.map(item => Object.values(item)[0]))
      });
    this.apiService.getFaultsTotal('factory-1')
      .subscribe( data => {
        this.faultsTotal.push(data.map(item => Object.values(item)[0]))
      });
    this.apiService.getBottlesTotal('factory-2')
      .subscribe( data => {
        this.bottlesTotal.push(data.map(item => Object.values(item)[0]))
        console.log(this.bottlesTotal)
      });
    this.apiService.getFaultsTotal('factory-2')
      .subscribe( data => {
        this.faultsTotal.push(data.map(item => Object.values(item)[0]))
        console.log(this.faultsTotal)
      })
  }

}
