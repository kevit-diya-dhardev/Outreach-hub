import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WorkspacesComponent } from '../workspaces/workspaces.component';
import { UsersComponent } from '../users/users.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'my-workspaces', component: WorkspacesComponent },
  { path: 'my-users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
