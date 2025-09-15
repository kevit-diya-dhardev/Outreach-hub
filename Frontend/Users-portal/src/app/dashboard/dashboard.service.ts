import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecodedToken } from '../jwt.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  user: any;
  userUrl = 'http://localhost:3000/users';
  workspaceUrl = 'http://localhost:3000/workspaces';
  getUser(userId: string) {
    return this.http.get(`${this.userUrl}/${userId}`);
  }

  getWorkspace(id: string) {
    return this.http.get(`${this.workspaceUrl}/${id}`);
  }
}
