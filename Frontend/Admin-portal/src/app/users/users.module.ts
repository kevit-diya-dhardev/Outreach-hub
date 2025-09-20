import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersServices } from './users.services';
import { WorkspacesServices } from '../workspaces/workspaces.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [UsersComponent ],
  exports: [UsersComponent],
  providers: [UsersServices, WorkspacesServices],
})
export class UsersModule {}
