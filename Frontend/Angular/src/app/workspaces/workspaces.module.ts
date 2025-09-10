import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspacesComponent } from './workspaces.component';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';

@NgModule({
  imports: [CommonModule, WorkspacesRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [WorkspacesComponent, CreateWorkspaceComponent],
  exports: [WorkspacesComponent],
})
export class WorkspacesModule {}
