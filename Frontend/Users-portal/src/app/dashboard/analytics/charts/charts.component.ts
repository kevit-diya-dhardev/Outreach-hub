import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { SnackbarService } from '../../../snackbar/snackbar.service';
import { ChartsService } from './charts-service.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  public barChartLegend = true;
  public barChartPlugins = [];
  newLabels!: string[];
  newDatasets!: string[];
  workspace_id: string = localStorage.getItem('workspace_id')!;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [{ data: [5, 8, 3, 7, 6], label: 'Campaigns Launched' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, // Makes the chart resize with the container
  };
  dateRangeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private chartService: ChartsService
  ) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  applyDateFilter() {
    const { startDate, endDate } = this.dateRangeForm.getRawValue();
    if (!startDate || !endDate) {
      this.snackbarService.show('Please enter valid select range!', 'error');
    } else {
      this.chartService
        .getUpdatedCampaignsData(this.workspace_id, startDate, endDate)
        .subscribe({
          next: (response) => {},
          error: (error) => {},
        });
    }
  }
}
