import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgChartsModule } from 'ng2-charts';

import { ChartsComponent } from './analytics/charts/charts.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, ChartsComponent],
  imports: [CommonModule, DashboardRoutingModule, NgChartsModule],
  exports: [NavbarComponent],
})
export class DashboardModule {}
