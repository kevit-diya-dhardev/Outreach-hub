import { Component } from '@angular/core';
import { WorkspacesServices } from './workspaces.service';
import { Workspace } from './models/workspace';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrl: './workspaces.component.scss',
})
export class WorkspacesComponent {
  isFormModalVisible!: boolean;
  closeAddWorkspaceModal() {
    this.isFormModalVisible = false;
  }
  openAddWorkspaceModal(): void {
    this.isFormModalVisible = true;
  }
  deleteWorkspace(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editWorkspace(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUsers(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private workspacesService: WorkspacesServices,
    private route: ActivatedRoute
  ) {}
  selected = '';
  myworkspaces: any[] = [];
  ngOnInit() {
    this.selected = 'workspaces';
    this.route.url.subscribe((urlSegment) => {
      const currentPath = urlSegment[0].path;
      if (currentPath == 'my-workspaces') {
        this.workspacesService.getMyWorkspaces().subscribe({
          next: (response: any) => {
            this.myworkspaces = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.workspacesService.getAllWorkspaces().subscribe({
          next: (response: any) => {
            this.myworkspaces = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  createWorkspace(workspaceData: Workspace) {
    this.workspacesService.createWorkspaces(workspaceData).subscribe({
      next: (response) => {},
      error: (error) => {},
    });
  }
}
