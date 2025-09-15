import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workspace } from '../workspaces/models/workspace';

@Injectable({ providedIn: 'root' })
export class WorkspacesServices {
  constructor(private http: HttpClient) {}

  myworkspace_url = 'http://localhost:3000/workspaces/my-workspaces';
  allworkspaces_url = 'http://localhost:3000/workspaces';
  getMyWorkspaces(page: number) {
    const options: any = page
      ? { params: new HttpParams().set('page', page) }
      : {};
    return this.http.get(this.myworkspace_url, options);
  }
  getAllWorkspaces(page: number) {
    const options: any = page
      ? { params: new HttpParams().set('page', page) }
      : {};
    return this.http.get(this.allworkspaces_url, options);
  }
  createWorkspaces(workspaceData: Workspace) {
    return this.http.post(this.allworkspaces_url, workspaceData);
  }

  deleteWorkspace(id: string) {
    return this.http.delete(`${this.allworkspaces_url}/${id}`);
  }
  editWorkspace(id: string) {}
}
