import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import {ApiService} from "../../core/api.service";
import {Bottle} from "../../model/bottle.model";

@Component({
  selector: 'app-factory1',
  templateUrl: './factory1.component.html',
  styleUrls: ['./factory1.component.scss']
})
export class Factory1Component implements OnInit{

  rawBottles: Bottle[];

  hourLabels = [];
  hourBottles = [];
  hourFaults = [];

  // possitiveBottles = 34;
  // negativeBottles = 14;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getBottlesByHour('factory-1')
      .subscribe( data => {
        this.hourLabels = data.map(item => Object.values(item)[1])
        this.hourBottles = data.map(item => Object.values(item)[0])
      });

    this.apiService.getFaultsByHour('factory-1')
      .subscribe( data => {
        this.hourFaults = data.map(item => Object.values(item)[0])
      });

    this.apiService.getBottles('factory-1')
      .subscribe( data => {
        this.rawBottles = data;
      });




    // this.hourLabels = this.rawHourBottles.map(item=>Object.values(item)[1])
    // this.hourData = this.rawHourBottles.map(item=>Object.values(item)[0])


  }


}
