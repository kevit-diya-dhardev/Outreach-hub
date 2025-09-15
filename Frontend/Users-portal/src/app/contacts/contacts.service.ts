import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.patch(`${this.url}/${contact_id}`, contactData);
  }
}
