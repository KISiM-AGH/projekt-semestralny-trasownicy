import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import more from 'highcharts/highcharts-more';

@Component({
  selector: 'app-widget-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnChanges {

  chartOptions;
  // @Input() title = '';
  // @Input() Ytitle = '';
  // @Input() FactoryID = '';
  // @Input() hourLabels = [];
  // @Input() hourBottles = [];
  // @Input() hourFaults = [];

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
    this.chartOptions = {};
  }
}
