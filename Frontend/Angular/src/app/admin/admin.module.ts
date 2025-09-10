import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardModule,
    WorkspacesModule,
    UsersModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
