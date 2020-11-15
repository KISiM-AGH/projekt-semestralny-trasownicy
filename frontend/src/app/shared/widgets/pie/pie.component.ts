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


  @Input() title = "";
  @Input() good = 1;
  @Input() bad = 1;

  @Input() data = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
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
        data: [{name: "Good", y: this.data[0]}, {name: "Bad", y: this.data[1]}]
      }]
    };
    }

  ngOnInit() {
    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
