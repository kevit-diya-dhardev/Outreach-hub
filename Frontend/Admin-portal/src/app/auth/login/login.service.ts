import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  loginUrl: string = 'http://localhost:3000/login';
  sendLoginData(userData: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, userData);
  }
}
