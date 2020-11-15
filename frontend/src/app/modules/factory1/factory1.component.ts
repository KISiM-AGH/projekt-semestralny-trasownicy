import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {ApiService} from "../../core/api.service";
import {Bottle} from "../../model/bottle.model";
import {hourData} from "../../model/hourData.model";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

// function collate(data: any) {
//   return [];
// }
//
// function collate(d) {
//   return d.reduce(function(prev, cur, index) {
//     var ret = {};
//     for (var prop in cur) {
//       if (index === 0) {
//         ret[prop] = [];
//       } else {
//         ret[prop] = prev[prop];
//       }
//       ret[prop].push(cur[prop]);
//     }
//     return ret;
//   }, {});
// }

@Component({
  selector: 'app-factory1',
  templateUrl: './factory1.component.html',
  styleUrls: ['./factory1.component.scss']
})
export class Factory1Component implements OnInit{

  rawBottles: Bottle[];
  // rawHourBottles: hourData[];

  // hourLabels = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
  // hourData = [18110, 19832, 19770, 19800, 19803, 19809, 19772, 19019, 18014, 18018, 17999, 18000, 18009, 19629, 21611, 22271, 15463, 15507, 15498, 15492, 10643];

  public hourLabels = [];
  public hourData = [];

  bottles = [{
    name: 'Factory 1',
    data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
    name: 'Factory 2',
    data: [106, 107, 111, 133, 221, 767, 1766]
  }];



  bigChart = [];
  cards = [];
  pieChart = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

//do usuniecia dashboard ponizej
  constructor(private dashboardService: DashboardService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getBottlesByHour('factory-1')
      .subscribe( data => {
        // console.log(data);
        this.hourLabels = data.map(item => Object.values(item)[1])
        // console.log(this.hourLabels)
        this.hourData = data.map(item => Object.values(item)[0])
        // console.log(this.hourData)
      });

    this.apiService.getBottles('factory-1')
      .subscribe( data => {
        this.rawBottles = data;
      });



    // this.hourLabels = this.rawHourBottles.map(item=>Object.values(item)[1])
    // this.hourData = this.rawHourBottles.map(item=>Object.values(item)[0])



    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();

    this.dataSource.paginator = this.paginator;
  }


}
