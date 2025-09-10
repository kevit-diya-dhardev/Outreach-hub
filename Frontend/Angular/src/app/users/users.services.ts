import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './models/user';
@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}
  myuser_url = 'http://localhost:3000/users/my-users';
  user_url = 'http://localhost:3000/users/';
  getMyUsers() {
    console.log('Inside my users method');
    return this.http.get(this.myuser_url);
  }
  getAllUsers() {
    return this.http.get(this.user_url);
  }
  createUser(userData: user) {
    return this.http.post(this.user_url, userData);
  }
}
