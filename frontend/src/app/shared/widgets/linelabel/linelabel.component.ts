import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {ApiService} from "../../../core/api.service";

@Component({
  selector: 'app-widget-linelabel',
  templateUrl: './linelabel.component.html',
  styleUrls: ['./linelabel.component.css']
})
export class LinelabelComponent implements OnInit {

  chartOptions: {};
  @Input() title: string;
  @Input() Ytitle: string;
  @Input() FactoryID: string;
  @Input() hourLabels = [];
  @Input() data = [];

  Highcharts = Highcharts;

  constructor(private apiService: ApiService) { }

  getchartOptions() {
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: this.title
      },
      subtitle: {
        text: 'Source: koko-kola'
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
      series: [{name: this.title, data: this.data}]
    }


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
