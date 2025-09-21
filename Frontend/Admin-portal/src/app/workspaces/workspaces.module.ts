import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspacesComponent } from './workspaces.component';
import { CreateWorkspaceComponent } from './app-edit/create-workspace.component';
import { ViewWorkspaceComponent } from './view-workspace/view-workspace.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkspacesComponent, CreateWorkspaceComponent, ViewWorkspaceComponent],
  exports: [WorkspacesComponent],
})
export class WorkspacesModule {}
