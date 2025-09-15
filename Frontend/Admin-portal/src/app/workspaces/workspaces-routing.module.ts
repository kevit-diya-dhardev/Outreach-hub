import { NgModule } from '@angular/core';
import { RouterEvent, RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { WorkspacesComponent } from './workspaces.component';

export const routes: Routes = [{ path: '', component: WorkspacesComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspacesRoutingModule {}
