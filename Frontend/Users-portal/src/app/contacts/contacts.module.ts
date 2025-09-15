import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService } from './contacts.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactsComponent, ContactFormComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class ContactsModule {}
