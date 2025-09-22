import { Component } from '@angular/core';
<<<<<<< HEAD
import { ChartConfiguration } from 'chart.js';
=======
>>>>>>> 30be9cd4eac34b926b8de53a9a26d31fa595c8d4

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
<<<<<<< HEAD
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
=======
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  
>>>>>>> 30be9cd4eac34b926b8de53a9a26d31fa595c8d4
}
