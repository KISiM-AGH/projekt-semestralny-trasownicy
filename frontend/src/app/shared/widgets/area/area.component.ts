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
  @Input() allBottles = [];
//  @Input() yBottles = [];
//  @Input() hourFaults = [];
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
    console.log(this.allBottles);
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },

      title: {
        text: 'Highcharts drawing points'
      },

      subtitle: {
        text: 'Using the Boost module'
      },

      tooltip: {
        valueDecimals: 2
      },

      xAxis: {
        type: 'datetime'
      },

      series: [{name: 'Bottles', data: this.allBottles}],
  };
}
}
