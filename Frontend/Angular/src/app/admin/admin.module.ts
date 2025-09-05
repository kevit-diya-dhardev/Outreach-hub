import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule({
  imports: [CommonModule, AdminRoutingModule, DashboardModule],
  declarations: [AdminComponent],
})
export class AdminModule {}
