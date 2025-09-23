import { Component } from '@angular/core';
import { SharedChartsService } from '../shared-charts.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartsService } from '../chart.service';
import { BaseChartDirective } from 'ng2-charts';
import { SnackbarService } from '../../../../snackbar/snackbar.service';

@Component({
  selector: 'app-message-per-type',
  templateUrl: './message-per-type.component.html',
  styleUrl: './message-per-type.component.scss',
})
export class MessagePerTypeComponent {
  constructor(
    private filterService: SharedChartsService,
    private chartService: ChartsService,
    private snackbarService: SnackbarService
  ) {}
  startDate!: string;
  endDate!: string;
  selectedMessageType: string = 'Text';
  isListVisible: boolean = false;
  workspace_id: string = localStorage.getItem('workspace_id')!;
  public doughnutChartType: 'doughnut' = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['2025-09-07', '2025-09-08'],
    datasets: [
      {
        data: [1, 3],
        backgroundColor: ['#7f56d9', '#039855'], // custom colors
        borderWidth: 1,
      },
    ],
  };
  public newData: number[] = [];
  public newLabels: string[] = [];
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
  };
  ngOnInit() {
    this.filterService.filter$.subscribe({
      next: (response) => {
        this.startDate = response.startDate;
        this.endDate = response.endDate;
        this.getMessagePerType();
      },
    });
  }

  selectMessageType(value: string) {
    this.isListVisible = !this.isListVisible;
    this.selectedMessageType = value;
    if (!this.startDate || !this.endDate) {
      this.snackbarService.show('Select valid range first!', 'error');
    } else {
      this.getMessagePerType();
    }
  }
  getMessagePerType() {
    this.chartService
      .getMessagePerType(
        this.workspace_id,
        this.startDate,
        this.endDate,
        this.selectedMessageType
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.newLabels = [];
          this.newData = [];
          for (let i = 0; i < response.length; i++) {
            this.newLabels[i] = response[i].date;
            this.newData[i] = response[i].count;
          }

          this.doughnutChartData = {
            labels: this.newLabels,
            datasets: [
              {
                data: this.newData,
                backgroundColor: ['#7f56d9', '#37324eff', '#039855'], // custom colors
                borderWidth: 1,
              },
            ],
          };
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
