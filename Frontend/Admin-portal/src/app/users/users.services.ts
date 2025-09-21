import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './models/user';
@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}
  myuser_url = 'http://localhost:3000/users/my-users';
  user_url = 'http://localhost:3000/users';
  getMyUsers(page: number) {
    const options: any = page
      ? { params: new HttpParams().set('page', page) }
      : {};
    return this.http.get(this.myuser_url);
  }
  getAllUsers(page: number) {
    const options = page ? { params: new HttpParams().set('page', page) } : {};
    return this.http.get(this.user_url);
  }
  createUser(userData: any) {
    return this.http.post(this.user_url, userData);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.user_url}/${id}`);
  }
  editUser(id: string, userData: any) {
    return this.http.patch(`${this.user_url}/${id}`, userData);
  }
}
