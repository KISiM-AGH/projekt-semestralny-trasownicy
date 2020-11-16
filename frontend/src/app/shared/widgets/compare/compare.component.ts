import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnChanges {

  chartOptions;
  @Input() title = '';
  @Input() Ytitle = '';
  @Input() allBottlesXf1 = [];
  @Input() allBottlesYf1 = [];
  @Input() allBottlesXf2 = [];
  @Input() allBottlesYf2 = [];
  @Input() allFaultsXf1 = [];
  @Input() allFaultsYf1 = [];
  @Input() allFaultsXf2 = [];
  @Input() allFaultsYf2 = [];
  allBottlesData = [];
  allFaultsData = [];
  Highcharts = Highcharts;

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
    let arr;
    let arr2;
    let arr3;
    arr2 = [];
    arr3 = [];
    for (i = 0; i < this.allBottlesXf1.length; i++) {
      arr = [string_to_date_to_number(this.allBottlesXf1[i]), this.allBottlesYf1[i]];
      arr2.push(arr);
      arr = [string_to_date_to_number(this.allBottlesXf2[i]), this.allBottlesYf2[i]];
      arr3.push(arr);

    }
    this.allBottlesData = [arr2, arr3];

    arr2 = [];
    arr3 = [];
    for (i = 0; i < this.allFaultsXf1.length; i++) {
      arr = [string_to_date_to_number(this.allFaultsXf1[i]), this.allFaultsYf1[i]];
      arr2.push(arr);
      arr = [string_to_date_to_number(this.allFaultsXf2[i]), this.allFaultsYf2[i]];
      arr3.push(arr);
    }
    this.allFaultsData = [arr2, arr3];

    console.log(this.allBottlesData);
    console.log(this.allFaultsData);

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

      series: [{name: 'Good F1', data: this.allBottlesData[0]}, {name: 'Faulty F1', data: this.allFaultsData[0]},
        {name: 'Good F2', data: this.allBottlesData[1]}, {name: 'Faulty F2', data: this.allFaultsData[1]}]
    };
  }
}

function string_to_date_to_number(s: string): number {
  const s2 = s.split('-');
  const s3 = s2[2].split(' ');
  const s4 = s3[1].split(':');
  const s5 = s2[1];
  const day = parseInt(s2[0], null);
  const month = new Date(Date.parse(s5 + ' 1, 2000')).getMonth() + 1;
  const year = parseInt(s3[0], null);
  const hour = parseInt(s4[0], null);
  return new Date(year, month, day, hour).getTime();
}
