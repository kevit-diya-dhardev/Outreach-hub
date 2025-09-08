import { Component } from '@angular/core';
import { WorkspacesServices } from '../workspaces.service';
import { Workspace } from '../models/workspace';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrl: './workspaces.component.scss',
})
export class WorkspacesComponent {
  deleteWorkspace(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editWorkspace(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUsers(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private workspacesService: WorkspacesServices) {}
  selected = '';
  workspaces: any[] = [];
  ngOnInit() {
    this.selected = 'workspaces';
    this.workspacesService.getMyWorkspaces().subscribe({
      next: (response: any) => {
        this.workspaces = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createWorkspace(workspaceData: Workspace) {
    this.workspacesService.createWorkspaces(workspaceData).subscribe({
      next: (response) => {},
      error: (error) => {},
    });
  }
}
