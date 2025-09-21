import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DecodejwtService } from '../decodejwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: DecodejwtService) {}
  token = localStorage.getItem('token')!;
  userId = this.jwtService.decode(this.token).userId;
  url = 'http://localhost:3000/users';
  getUserDetails() {
    return this.http.get(`${this.url}/${this.userId}`);
  }
}
