import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { NgChartsModule } from 'ng2-charts';

import { ChartsComponent } from './analytics/charts/charts.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, ChartsComponent],
  imports: [CommonModule, DashboardRoutingModule, NgChartsModule],
=======
import { ChartsComponent } from './analytics/charts/charts.component';
import { TablesComponent } from './analytics/tables/tables.component';
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, ChartsComponent, TablesComponent],
  imports: [CommonModule, DashboardRoutingModule, AuthModule],
>>>>>>> 30be9cd4eac34b926b8de53a9a26d31fa595c8d4
  exports: [NavbarComponent],
})
export class DashboardModule {}
