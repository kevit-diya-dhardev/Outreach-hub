import { NgModule } from '@angular/core';
import { RouterEvent, RouterModule, Routes } from '@angular/router';
import { WorkspacesComponent } from './my workspace/workspaces.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', component: WorkspacesComponent },
  // { path: 'all-workspace' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspacesRoutingModule {}
