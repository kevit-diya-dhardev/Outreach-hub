import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WorkspacesComponent } from '../workspaces/my workspace/workspaces.component';

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
        path: 'workspaces',
        loadChildren: () =>
          import('../workspaces/workspaces.module').then(
            (m) => m.WorkspacesModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), RouterOutlet],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
