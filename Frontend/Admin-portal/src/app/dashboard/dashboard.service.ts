import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardServices {
  constructor(private http: HttpClient) {}
  workspace_url = 'http://localhost:3000/workspace/';
  user_url = 'http://localhost:3000/users';

  options: any = { params: new HttpParams().set('page', 1) };
  getWorkspaces() {
    return this.http.get(this.workspace_url, this.options);
  }

  getUsers() {
    return this.http.get(this.user_url, this.options);
  }
}
