import { Injectable } from '@angular/core';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000/login';
  constructor(private http: HttpClient) {}
  sendLoginData(user: User) {
    return this.http.post(this.url, user);
  }
}
