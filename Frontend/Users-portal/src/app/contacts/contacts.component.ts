import { Component } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ContactsService } from './contacts.service';
import { Contact } from './contact-form/models/contacts';
import { concatAll } from 'rxjs';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  viewContactVisible: boolean = false;
  contactFormVisible = false;
  modeType!: string;
  contacts: any;
  allcontacts: any;
  activeView: any;
  workspace = localStorage.getItem('workspace_id')!;
  formValue!: Contact;
  role: string = localStorage.getItem('role')!;
  contactData: any;
  userId = this.jwtService.decode(localStorage.getItem('token')!).userId;
  constructor(
    private dashboardService: DashboardService,
    private contactService: ContactsService,
    private jwtService: JwtService
  ) {}
  recieveFormCloseData(formClose: boolean) {
    this.contactFormVisible = formClose;
  }
  switchView(view: string) {
    this.activeView = view;
    this.getContacts();
  }
  recieveFormSubmitData({ phoneNumber, ...formData }: Contact) {
    this.contactFormVisible = false;
    if (this.modeType == 'edit') {
      this.editContact({
        ...formData,
        phoneNumber: Number(phoneNumber),
        _id: this.formValue._id,
      });
    } else {
      this.createContact({
        ...formData,
        phoneNumber: Number(phoneNumber),
      });
    }
  }
  recieveViewFormData(viewForm: boolean) {
    this.viewContactVisible = viewForm;
  }
  editMode(modeType: string, contact: Contact) {
    this.modeType = modeType;
    console.log(contact);
    this.contactFormVisible = true;
    this.formValue = contact;
  }
  createMode(modeType: string) {
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
    this.activeView = 'my';
    this.getContacts();
  }
  viewContact(contact: any) {
    this.viewContactVisible = true;
    this.contactData = contact;
  }
  editContact({ _id, ...contactData }: Contact) {
    this.contactService.editContact(_id, { ...contactData }).subscribe({
      next: (response) => {
        this.getContacts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getContacts() {
    this.contactService.getContacts(this.workspace).subscribe({
      next: (response: any) => {
        this.allcontacts = response.contacts;
        if (this.activeView == 'my') {
          this.contacts = this.allcontacts.filter((contact: any) => {
            return contact.createdBy == this.userId;
          });
        } else {
          this.contacts = this.allcontacts;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createContact(contactData: Contact) {
    this.contactService.createContact(contactData).subscribe({
      next: (response) => {
        this.getContacts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
