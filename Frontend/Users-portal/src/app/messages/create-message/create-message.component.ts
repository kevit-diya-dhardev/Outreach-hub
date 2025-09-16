import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../messages.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrl: './create-message.component.scss',
})
export class CreateMessageComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
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
      text: this.messageData.text.value,
    };
    if (this.messageForm.get('type')?.value == 'Text-Image') {
      messageContent.imageUrl = this.messageForm.get('imageUrl')?.value;
    }
    let finalFormData: any = {
      name: this.messageData.name.value,
      type: this.messageData.type.value,
      message: messageContent,
    };

    this.messageService
      .editMessage(this.messageData._id, finalFormData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.formVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  createMessage() {
    let messageContent: any = {
      text: this.messageData.text.value,
    };
    if (this.messageForm.get('type')?.value == 'Text-Image') {
      messageContent.imageUrl = this.messageForm.get('imageUrl')?.value;
    }
    let finalFormData: any = {
      name: this.messageData.name.value,
      type: this.messageData.type.value,
      message: messageContent,
      workspace_id: localStorage.getItem('workspace_id'),
    };

    this.messageService
      .editMessage(this.messageData._id, finalFormData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.formVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
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
