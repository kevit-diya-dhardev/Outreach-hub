import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workspace } from './models/workspace';
 


@Injectable({ providedIn: 'root' })
export class WorkspacesServices {
  constructor(private http: HttpClient) {}
  workspace_url = 'http://localhost:3000/workspace/';
  user_url = 'http://localhost:3000/users';
  getWorkspaces() {
    return this.http.get(this.workspace_url);
  }

  createWorkspaces(workspaceData: Workspace) {
    return this.http.post(this.workspace_url, workspaceData);
  }

  deleteWorkspace(id: string) {}
  editWorkspace(id: string) {}
}
