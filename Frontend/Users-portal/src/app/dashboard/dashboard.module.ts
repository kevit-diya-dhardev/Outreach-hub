import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsComponent } from './analytics/charts/charts.component';
import { TablesComponent } from './analytics/tables/tables.component';
import { AuthModule } from '../auth/auth.module';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ChartsComponent,
    TablesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AuthModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [NavbarComponent],
})
export class DashboardModule {}
