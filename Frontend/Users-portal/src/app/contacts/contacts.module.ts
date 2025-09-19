import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactsService } from './contacts.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewConatctComponent } from './view-conatct/view-conatct.component';
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule({
  declarations: [ContactsComponent, ContactFormComponent, ViewConatctComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule
],
  providers: [],
})
export class ContactsModule {}
