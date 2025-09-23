import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { ChartsService } from '../chart.service';
import { SharedChartsService } from '../shared-charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  public barChartLegend = true;
  public barChartPlugins = [];
  newLabels: string[] = [];
  newDatasets: number[] = [];
  startDate!: string;
  endDate!: string;
  workspace_id: string = localStorage.getItem('workspace_id')!;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2025-09-7'],
    datasets: [{ data: [0], label: 'Campaigns launched' }],
  };

  dateRangeForm!: FormGroup;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  constructor(
    private filterService: SharedChartsService,
    private snackbarService: SnackbarService,
    private chartService: ChartsService
  ) {}

  ngOnInit() {
    this.filterService.filter$.subscribe({
      next: (response: any) => {
        this.startDate = response.startDate;
        this.endDate = response.endDate;
        this.getCampaigns();
      },
    });
  }

  getCampaigns() {
    this.chartService
      .getUpdatedCampaignsData(this.workspace_id, this.startDate, this.endDate)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.newDatasets = [];
          this.newLabels = [];
          for (let i = 0; i < response.length; i++) {
            this.newLabels[i] = response[i].date;
            this.newDatasets[i] = response[i].count;
          }
          this.barChartData = {
            labels: this.newLabels,
            datasets: [
              { data: this.newDatasets, label: 'Campaigns launched!' },
            ],
          };
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
