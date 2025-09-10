import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WorkspacesComponent } from '../workspaces/workspaces.component';
import { UsersComponent } from '../users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'my-workspaces',
        component: WorkspacesComponent,
      },
      {
        path: 'all-workspaces',
        component: WorkspacesComponent,
      },
      {
        path: 'my-users',
        component: UsersComponent,
      },
      {
        path: 'all-users',
        component: UsersComponent,
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), RouterOutlet],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
