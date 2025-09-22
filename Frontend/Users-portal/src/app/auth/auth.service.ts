import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  sendLoginData(user: User) {
    return this.http.post(`${this.url}/login`, user);
  }

  userLogout() {
    return this.http.post(`${this.url}/logout`, null);
  }
}
