import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
