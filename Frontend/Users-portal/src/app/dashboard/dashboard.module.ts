import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [CommonModule, DashboardRoutingModule],
  exports: [NavbarComponent],
})
export class DashboardModule {}
