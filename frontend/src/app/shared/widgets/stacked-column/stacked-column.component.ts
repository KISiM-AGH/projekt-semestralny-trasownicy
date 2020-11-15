import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import more from 'highcharts/highcharts-more';

//https://www.highcharts.com/demo/column-stacked-and-grouped

@Component({
  selector: 'app-widget-stacked-column',
  templateUrl: './stacked-column.component.html',
  styleUrls: ['./stacked-column.component.css']
})
export class StackedColumnComponent implements OnInit, OnChanges {

  chartOptions = {};

  // @Input() hourLabels = [];
  // @Input() hourBottles = [];
  // @Input() hourFaults = [];

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
        text: 'Daily costam'
      },

      xAxis: {
        categories: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5']
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Bottles'
        }
      },

      tooltip: {
        formatter: function () {
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
        name: 'F1 Vergin Bottles',
        data: [53423, 44232, 47433, 62234, 45233],
        stack: 'male'
      }, {
        name: 'F1 Faults',
        data: [967, 575, 1023, 865, 434],
        stack: 'male'
      }, {
        name: 'F2 Vergin Bottles',
        data: [48423, 49232, 56433, 42234, 49233],
        stack: 'female'
      }, {
        name: 'F2 Faults',
        data: [767, 775, 623, 965, 834],
        stack: 'female'
      }]
    };
  }
}
