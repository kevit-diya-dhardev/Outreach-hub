import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsComponent } from './analytics/charts/charts.component';
import { TablesComponent } from './analytics/tables/tables.component';
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, ChartsComponent, TablesComponent],
  imports: [CommonModule, DashboardRoutingModule, AuthModule],
  exports: [NavbarComponent],
})
export class DashboardModule {}
