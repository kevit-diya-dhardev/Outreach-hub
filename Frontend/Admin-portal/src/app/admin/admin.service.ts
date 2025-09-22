import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/logout/admin';
  logoutUser() {
    return this.http.post(this.url, null);
  }
}
