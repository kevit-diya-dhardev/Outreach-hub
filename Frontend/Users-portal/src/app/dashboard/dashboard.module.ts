import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartsComponent } from './analytics/charts/campaignsDoneChart/charts.component';
import { TablesComponent } from './analytics/tables/tables.component';
import { AuthModule } from '../auth/auth.module';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagePerTypeComponent } from './analytics/charts/message-per-type/message-per-type.component';
import { SelectDateRangeComponent } from './analytics/charts/select-date-range/select-date-range.component';
import { ContactsReachedComponent } from './analytics/charts/contacts-reached/contacts-reached.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ChartsComponent,
    TablesComponent,
    MessagePerTypeComponent,
    SelectDateRangeComponent,
    ContactsReachedComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  exports: [NavbarComponent],
})
export class DashboardModule {}
