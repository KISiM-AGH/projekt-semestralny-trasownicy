import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit, OnChanges {

  constructor() { }

  chartOptions;
  @Input() title = '';
  @Input() f1bottlesTotal: number;
  @Input() f2bottlesTotal: number;
  @Input() f1faultsTotal: number;
  @Input() f2faultsTotal: number;

  bottlesTotal = [];
  faultsTotal = [];

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
    this.bottlesTotal = [this.f1bottlesTotal - this.f1faultsTotal, this.f2bottlesTotal-this.f2faultsTotal];
    this.faultsTotal = [this.f1faultsTotal, this.f2faultsTotal];
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Whole data about bottles'
      },
      xAxis: {
        categories: ['Factory 1', 'Factory 2']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total bottles'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: ( // theme
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color
            ) || 'gray'
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Good bottles',
        data: this.bottlesTotal
        // data: [5, 3]
      }, {
        name: 'Faulty bottles',
        data: this.faultsTotal
      }]
    }
  }

}
