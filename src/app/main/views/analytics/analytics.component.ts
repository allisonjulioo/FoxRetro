import { Component, OnInit } from '@angular/core';
import { CloudData, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { ChartDataSets } from 'chart.js';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}
  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 0.8, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.8, // Zoom will take affect after 0.8 seconds
  };
  words: CloudData[] = [];
  lineChartData: ChartDataSets[] = [
    {
      label: '',
      lineTension: 0.1,
      borderCapStyle: 'butt',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType = 'bar';

  ngOnInit() {
    this.analyticsService.getCloudWords().subscribe((words) => {
      this.words = words;
    });
    this.analyticsService.getChartLine().subscribe((lines) => {
      this.lineChartLabels = lines.data.labels;
      this.lineChartData = lines.data.data;
    });
  }
}
