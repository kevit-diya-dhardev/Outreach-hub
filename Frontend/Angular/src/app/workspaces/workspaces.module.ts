import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorkspacesComponent } from './my workspace/workspaces.component';
import { WorkspacesRoutingModule } from './workspaces-routing.module';

@NgModule({
  imports: [CommonModule, WorkspacesRoutingModule],
  declarations: [WorkspacesComponent],
  exports: [WorkspacesComponent],
})
export class WorkspacesModule {}
