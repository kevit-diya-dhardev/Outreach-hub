import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';

import { CreateMessageComponent } from './create-message/create-message.component';
import { ViewMessageComponent } from './view-message/view-message.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    MessagesComponent,
    CreateMessageComponent,
    ViewMessageComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule
],
})
export class MessagesModule {}
