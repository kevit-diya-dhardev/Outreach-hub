import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workspace } from '../workspaces/models/workspace';

@Injectable({ providedIn: 'root' })
export class WorkspacesServices {
  constructor(private http: HttpClient) {}

  myworkspace_url = 'http://localhost:3000/workspace/my-workspaces';
  allworkspaces_url = 'http://localhost:3000/workspace/';
  getMyWorkspaces() {
    return this.http.get(this.myworkspace_url);
  }
  getAllWorkspaces() {
    return this.http.get(this.allworkspaces_url);
  }
  createWorkspaces(workspaceData: Workspace) {
    return this.http.post(this.allworkspaces_url, workspaceData);
  }

  deleteWorkspace(id: string) {
    return this.http.delete(this.allworkspaces_url);
  }
  editWorkspace(id: string) {}
}
