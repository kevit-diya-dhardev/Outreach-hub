import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact-form/models/contacts';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/contacts';
  getContacts(workspace_id: string) {
    return this.http.get(`${this.url}/${workspace_id}`);
  }

  deleteContact(contact_id: string) {
    return this.http.delete(`${this.url}/${contact_id}`);
  }

  editContact(contact_id: string, contactData: any) {
    let finalEditData = contactData;
    finalEditData.workspace_id = localStorage.getItem('workspace_id');
    console.log(finalEditData);
    return this.http.patch(`${this.url}/${contact_id}`, finalEditData);
  }
  createContact(contactData: any) {
    let finalData = contactData;
    finalData.workspace_id = localStorage.getItem('workspace_id');
    return this.http.post(this.url, finalData);
  }
}
