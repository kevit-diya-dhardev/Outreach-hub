import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  workspace_url = 'http://localhost:3000/workspace/';
  user_url = 'http://localhost:3000/users';
  getWorkspaces() {
    return this.http.get(this.workspace_url);
  }

  getUsers() {
    return this.http.get(this.user_url);
  }
}
