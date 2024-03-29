import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-stacked-column',
  templateUrl: './stacked-column.component.html',
  styleUrls: ['./stacked-column.component.css']
})
export class StackedColumnComponent implements OnInit, OnChanges {

  chartOptions = {};
  @Input() title = '';
  @Input() dayLabels = [];
  @Input() factory1bottles = [];
  @Input() factory2bottles = [];
  @Input() factory1faults = [];
  @Input() factory2faults = [];

  Highcharts = Highcharts;

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
    this.chartOptions = {

      chart: {
        type: 'column'
      },

      title: {
        text: this.title
      },

      xAxis: {
        categories: this.dayLabels
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Bottles'
        }
      },

      tooltip: {
        formatter(): string {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
        }
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Good bottles F1',
        data: this.factory1bottles,
        stack: 'f1'
      }, {
        name: 'Faulty bottles F1',
        data: this.factory1faults,
        stack: 'f1'
      }, {
        name: 'Good bottles F2',
        data: this.factory2bottles,
        stack: 'f2'
      }, {
        name: 'Faulty bottles F2',
        data: this.factory2faults,
        stack: 'f2'
      }]
    };
  }
}
