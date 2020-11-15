import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {ApiService} from '../../core/api.service';
import {Bottle} from '../../model/bottle.model';

@Component({
  selector: 'app-factory2',
  templateUrl: './factory2.component.html',
  styleUrls: ['./factory2.component.scss']
})
export class Factory2Component implements OnInit{

  rawBottles: Bottle[];

  hourLabels = [];
  hourBottles = [];
  hourFaults = [];
  allBottlesX = [];
  allBottlesY = [];
  allBottlesData = [];
  allFaultsX = [];
  allFaultsY = [];
  allPowerX = [];
  allPowerY = [];

  // possitiveBottles = 34;
  // negativeBottles = 14;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getBottlesByHour('factory-2')
      .subscribe( data => {
        this.hourLabels = data.map(item => Object.values(item)[1]);
        this.hourBottles = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getFaultsByHour('factory-2')
      .subscribe( data => {
        this.hourFaults = data.map(item => Object.values(item)[0]);
      });

    this.apiService.getBottles('factory-2')
      .subscribe( data => {
        this.allBottlesX = data.map(item => Object.values(item)[4]);
        this.allBottlesY = data.map(item => Object.values(item)[5]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });

    this.apiService.getFaults('factory-2')
      .subscribe( data => {
        this.allPowerX = data.map(item => Object.values(item)[3]);
        this.allPowerY = data.map(item => Object.values(item)[3]);
        this.allFaultsX = data.map(item => Object.values(item)[4]);
        this.allFaultsY = data.map(item => Object.values(item)[5]);
        // console.log(this.allBottlesX);
        // console.log(this.allBottlesY);
      });



    // this.hourLabels = this.rawHourBottles.map(item=>Object.values(item)[1])
    // this.hourData = this.rawHourBottles.map(item=>Object.values(item)[0])


  }


}
