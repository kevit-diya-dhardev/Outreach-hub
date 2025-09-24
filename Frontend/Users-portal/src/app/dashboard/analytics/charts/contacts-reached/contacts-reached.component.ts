import { Component, Input } from '@angular/core';
import { ChartsService } from '../chart.service';
import { SharedChartsService } from '../shared-charts.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-contacts-reached',
  templateUrl: './contacts-reached.component.html',
  styleUrl: './contacts-reached.component.scss',
})
export class ContactsReachedComponent {
  constructor(
    private chartsService: ChartsService,
    private filterService: SharedChartsService
  ) {}
  startDate!: string;
  endDate!: string;
  newLabels: string[] = [];
  newData: number[] = [];
  @Input() workspace_id!: string;
  ngOnChanges() {
    this.filterService.filter$.subscribe({
      next: (response) => {
        this.startDate = response.startDate;
        this.endDate = response.endDate;
        this.getContactsReached();
      },
    });
  }

  public areaChartData: ChartData<'line'> = {
    labels: ['2025-09-07'],
    datasets: [
      {
        label: 'Contacts reached',
        data: [1],
        fill: true,
        backgroundColor: 'rgba(127, 86, 217, 0.2)',
        borderColor: '#7f56d9',
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };
  public areaChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  getContactsReached() {
    this.chartsService
      .getContactsReached(this.workspace_id, this.startDate, this.endDate)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.newLabels = [];
          this.newData = [];
          for (let i = 0; i < response.length; i++) {
            this.newLabels[i] = response[i].date;
            this.newData[i] = response[i].count;
          }
          this.areaChartData = {
            labels: this.newLabels,
            datasets: [
              {
                label: 'Contacts reached',
                data: this.newData,
                fill: true,
                backgroundColor: 'rgba(127, 86, 217, 0.2)',
                borderColor: '#7f56d9',
                tension: 0.4,
                borderWidth: 2,
              },
            ],
          };
        },
      });
  }
}
