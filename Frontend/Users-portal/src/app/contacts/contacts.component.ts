import { Component } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  contactFormVisible = false;
  modeType!: string;
  contacts: any;
  activeView: any;
  workspace = localStorage.getItem('workspace_id')!;
  constructor(
    private dashboardService: DashboardService,
    private contactService: ContactsService
  ) {}

  changeMode(modeType: string) {
    this.modeType = modeType;
    this.contactFormVisible = true;
  }
  deleteContact(contact: any) {
    console.log(contact);
    this.contactService.deleteContact(contact._id).subscribe({
      next: (response) => {
        console.log(response);
        this.getContacts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit() {
    this.getContacts();
  }
  viewContact(id: string) {}

  getContacts() {
    this.contactService.getContacts(this.workspace).subscribe({
      next: (response: any) => {
        console.log(response);
        this.contacts = response.contacts;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  role: string = localStorage.getItem('role')!;
}
