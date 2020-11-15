import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, OnChanges {

  Highcharts = Highcharts;
  chartOptions = {};
  bad = 0;
  good = 0;

  @Input() title = '';
  @Input() data = [];
  @Input() hourBottles = [];
  @Input() hourFaults = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.bad = this.hourFaults.reduce(function(a, b) { return a + b; }, 0);
    this.good = this.hourBottles.reduce(function(a, b) { return a + b; }, 0) - this.bad;

    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: this.title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Bottles',
        colorByPoint: true,
        data: [{name: 'Good', y: this.good}, {name: 'Bad', y: this.bad}]
      }]
    };
    }

  ngOnInit(): void {
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
