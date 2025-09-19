import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,FormsModule,BrowserAnimationsModule
  ],
  exports:[SnackbarComponent]
})
export class SnackbarModule { }
