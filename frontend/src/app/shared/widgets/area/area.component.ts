import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit, OnChanges{

  chartOptions;
  @Input() title = '';
  @Input() Ytitle = '';
  @Input() FactoryID = '';
  @Input() allBottlesX = [];
  @Input() allBottlesY = [];
  @Input() allFaultsX = [];
  @Input() allFaultsY = [];
  @Input() allPowerX = [];
  @Input() allPowerY = [];
//  @Input() hourFaults = [];
  Highcharts = Highcharts;
  allBottlesData = [];
  allFaultsData = [];
  allPowerData = [];

  constructor() { }

  ngOnInit(): void {
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  ngOnChanges(changes: SimpleChanges): void {
    let i;
    for (i = 0; i < this.allBottlesX.length; i = i + 100) {
      const arr = [new Date(this.allBottlesX[i]).getTime(), this.allBottlesY[i]];
      this.allBottlesData.push(arr);
    }
    for (i = 0; i < this.allFaultsX.length; i = i + 100) {
      const arr = [new Date(this.allFaultsX[i]).getTime(), this.allFaultsY[i]];
      this.allFaultsData.push(arr);
    }
    for (i = 0; i < this.allFaultsX.length; i = i + 100) {
      const arr = [new Date(this.allFaultsX[i]).getTime(), this.allPowerY[i]];
      this.allPowerData.push(arr);
    }
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },

      title: {
        text: this.title
      },

      tooltip: {
        valueDecimals: 2
      },

      xAxis: {
        type: 'datetime'
      },

      credits: {
        enabled: false
      },

      series: [{name: 'Bottles', data: this.allBottlesData}, {name: 'Faults', data: this.allFaultsData},
        {name: 'Power', data: this.allPowerData}],
  };
}
}
