import { Component } from '@angular/core';
import { MessageService } from './messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  constructor(private messageService: MessageService) {}
  messages: any;
  currentPath!: string;
  workspace: string = localStorage.getItem('workspace_id')!;
  userRole = localStorage.getItem('role');
  activeView: any;
  isOpen = false;
  selectedOption = 'Text';

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
  editMessage({ _id, messageData }: any) {
    this.messageService.editMessage(_id, { ...messageData }).subscribe({
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
  getMyMessages() {
    this.messageService.getMyMessages(this.workspace).subscribe({
      next: (response) => {
        console.log(response);
        this.messages = response;
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
