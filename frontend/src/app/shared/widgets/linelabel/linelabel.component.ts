import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {ApiService} from "../../../core/api.service";

@Component({
  selector: 'app-widget-linelabel',
  templateUrl: './linelabel.component.html',
  styleUrls: ['./linelabel.component.css']
})
export class LinelabelComponent implements OnInit, OnChanges {

  chartOptions;
  @Input() title = "";
  @Input() Ytitle = "";
  @Input() FactoryID = "";
  @Input() hourLabels = [];
  @Input() hourBottles = [];
  @Input() hourFaults = [];

  Highcharts = Highcharts;

  constructor(private apiService: ApiService) { }

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
        type: 'line'
      },
      title: {
        text: this.title
      },
      xAxis: {
        categories: this.hourLabels
      },
      yAxis: {
        title: {
          text: this.Ytitle
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true
      },
      series: [{name: "Bottles", data: this.hourBottles}, {name: "Faults", data: this.hourFaults}]
    }
  }
}
