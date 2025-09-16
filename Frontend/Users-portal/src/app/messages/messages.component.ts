import { Component } from '@angular/core';
import { MessageService } from './messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  createMode(mode: string) {
    this.mode = mode;
    this.messageFormVisible = true;
  }

  recieveMesageFormData(formVisible: boolean) {
    this.messageFormVisible = formVisible;
    this.getMyMessages();
  }
  constructor(private messageService: MessageService) {}
  messages: any;
  currentPath: string = 'myMessages';
  workspace: string = localStorage.getItem('workspace_id')!;
  userRole = localStorage.getItem('role');
  activeView: any;
  isOpen = false;
  selectedOption = 'Text';
  mode = '';
  messageFormVisible = false;
  messageData: any;
  deletemessage(message: any) {
    this.messageService.deleteMessage(message._id).subscribe({
      next: (response) => {
        console.log(response);
        this.getMyMessages();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  viewMessage(message: any) {}

  ngOnInit() {
    this.getMyMessages();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  editMessageForm(message: any) {
    this.messageFormVisible = true;
    this.mode = 'edit';
    this.messageData = message;
  }

  getMyMessages() {
    this.messageService.getMyMessages(this.workspace).subscribe({
      next: (response: any) => {
        console.log(response);
        this.messages = response.messages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getAllMessages() {
    this.messageService.getAllMessages(this.workspace).subscribe({
      next: (response) => {
        console.log(response);
        this.messages = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
