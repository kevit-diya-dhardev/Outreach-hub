import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [{ data: [5, 8, 3, 7, 6], label: 'Campaigns Launched' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, // Makes the chart resize with the container
  };
}
