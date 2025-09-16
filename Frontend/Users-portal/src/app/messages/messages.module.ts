import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';

import { CreateMessageComponent } from './create-message/create-message.component';

@NgModule({
  declarations: [MessagesComponent, CreateMessageComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MessagesModule {}
