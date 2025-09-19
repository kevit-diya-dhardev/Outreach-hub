import { Component } from '@angular/core';
import { MessageService } from './messages.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

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
  constructor(private messageService: MessageService,private snackbarService:SnackbarService) {}
  allmessages: any;
  mymessages: any;
  messages: any;
  currentPath: string = 'myMessages';
  workspace: string = localStorage.getItem('workspace_id')!;
  userRole = localStorage.getItem('role');
  activeView!: string;
  isOpen = false;
  selectedOption = 'Text';
  mode = '';
  messageFormVisible = false;
  viewMessageVisible = false;
  messageData: any;
  deletemessage(message: any) {
    this.messageService.deleteMessage(message._id).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.show('Message deleted successfully','success')
        this.getMyMessages();
      },
      error: (error) => {
         this.snackbarService.show(error.error.message,'error')
        console.log(error);
      },
    });
  }

  viewMessage(message: any) {
    this.viewMessageVisible = true;
    this.messageData = message;
  }
  switchView(view: string) {
    this.activeView = view;
    if (this.activeView == 'my') {
      this.getMyMessages();
    } else {
      this.getAllMessages();
    }
  }
  ngOnInit() {
    this.activeView = 'my';
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
  recieveViewFormData(formVisible: boolean) {
    console.log(formVisible);
    this.viewMessageVisible = formVisible;
  }

  getMyMessages() {
    this.messageService.getMyMessages(this.workspace).subscribe({
      next: (response: any) => {
        console.log(response);
        this.mymessages = response.messages;
        this.messages = this.mymessages;
      },
      error: (error) => {
         this.snackbarService.show(error.error.message,'error')
        console.log(error);
      },
    });
  }
  getAllMessages() {
    this.messageService.getAllMessages(this.workspace).subscribe({
      next: (response: any) => {
        console.log(response);
        this.allmessages = response.messages;
        this.messages = this.allmessages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
