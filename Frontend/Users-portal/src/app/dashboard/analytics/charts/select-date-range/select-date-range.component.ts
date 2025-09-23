import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../../snackbar/snackbar.service';
import { ChartsService } from '../chart.service';
import { SharedChartsService } from '../shared-charts.service';

@Component({
  selector: 'app-select-date-range',
  templateUrl: './select-date-range.component.html',
  styleUrl: './select-date-range.component.scss',
})
export class SelectDateRangeComponent {
  dateRangeForm!: FormGroup;
  newDatasets!: string[];
  newLabels!: number[];
  workspace_id: string = localStorage.getItem('workspace_id')!;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private filterService: SharedChartsService
  ) {}
  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  applyDateFilter() {
    const { startDate, endDate } = this.dateRangeForm.value;
    if (!startDate || !endDate) {
      this.snackbarService.show('Enter valid date range', 'error');
    }
    this.filterService.applyFilter(startDate, endDate);
  }
}
