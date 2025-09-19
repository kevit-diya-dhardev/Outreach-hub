import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../messages.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.scss',
})
export class CreateMessageComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService,
    private snackbarServie: SnackbarService
  ) {}
  workspace_id: string = localStorage.getItem('workspace_id')!;
  ngOnInit() {
    if (this.mode == 'edit') {
      this.messageForm.patchValue(this.messageData);
      this.messageForm.get('text')?.setValue(this.messageData.message.text);
      this.messageForm.get('imageUrl')?.setValue(this.messageData.imageUrl);
    }
  }
  selectType(selectedType: string) {
    this.messageForm.get('type')?.setValue(selectedType);
    this.isDropdownOpen = false;
  }
  @Input() mode!: string;
  @Input() messageData: any;
  @Output() formVisible = new EventEmitter<boolean>();
  messageForm = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    text: ['', [Validators.required]],
    imageUrl: [''],
  });
  closeForm() {
    this.formVisible.emit(false);
  }
  editMessage() {
    let messageContent: any = {
      text: this.messageForm.get('text')?.value,
    };
    if (this.messageForm.get('type')?.value == 'Text-Image') {
      messageContent.imageUrl = this.messageForm.get('imageUrl')?.value;
    }
    let finalFormData: any = {
      name: this.messageForm.get('name')?.value,
      type: this.messageForm.get('type')?.value,
      message: messageContent,
      workspace_id: this.workspace_id,
    };

    this.messageService
      .editMessage(this.messageData._id, finalFormData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.snackbarServie.show('Message edited successfully', 'success');
          this.formVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
          this.snackbarServie.show(error.error.message, 'error');
        },
      });
  }
  createMessage() {
    let messageContent: any = {
      text: this.messageForm.get('text')?.value,
    };
    if (this.messageForm.get('type')?.value == 'Text-Image') {
      messageContent.imageUrl = this.messageForm.get('imageUrl')?.value;
    }
    let finalFormData: any = {
      name: this.messageForm.get('name')?.value,
      type: this.messageForm.get('type')?.value,
      message: messageContent,
      workspace_id: this.workspace_id,
    };

    this.messageService.createMessge(finalFormData).subscribe({
      next: (response) => {
        console.log(response);this.snackbarServie.show('Message edited successfully','success')
        this.formVisible.emit(false);
      },
      error: (error) => {
        console.log(error);
        this.snackbarServie.show(error.error.message,'error')
      },
    });
  }
  submitData() {
    console.log('Inside submitData');
    if (this.mode == 'create') {
      this.createMessage();
    } else {
      this.editMessage();
    }
  }

  isDropdownOpen: boolean = false;
}
