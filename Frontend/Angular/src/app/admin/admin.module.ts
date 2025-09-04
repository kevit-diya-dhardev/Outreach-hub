import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminComponent],
})
export class AdminModule {}
