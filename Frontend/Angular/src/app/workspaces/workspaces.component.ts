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
  constructor(
    private workspacesService: WorkspacesServices,
    private route: ActivatedRoute
  ) {}
  totalPages!: number;
  currentPath!: string;
  page: number = 1;
  handleSuccess(value: boolean) {
    this.closeAddWorkspaceModal();
    if (this.currentPath == 'my-workspaces') {
      this.fetchMyWorkspace();
    } else {
      this.fetchAllWorkspaces();
    }
  }

  increasePage() {
    this.page++;
    if (this.currentPath == 'my-workspaces') {
      this.fetchMyWorkspace();
    } else {
      this.fetchAllWorkspaces();
    }
  }

  decreasePage() {
    this.page--;
    if (this.currentPath == 'my-workspaces') {
      this.fetchMyWorkspace();
    } else {
      this.fetchAllWorkspaces();
    }
  }
  isFormModalVisible!: boolean;
  closeAddWorkspaceModal() {
    this.isFormModalVisible = false;
  }
  openAddWorkspaceModal(): void {
    this.isFormModalVisible = true;
  }
  deleteWorkspace(id: string) {
    this.workspacesService.deleteWorkspace(id).subscribe({
      next: (response) => {
        console.log(response);
        if (this.currentPath == 'my-workspaces') {
          this.fetchMyWorkspace();
        } else {
          this.fetchAllWorkspaces();
        }
      },
      error: () => {},
    });
  }
  editWorkspace(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUsers(arg0: any) {
    throw new Error('Method not implemented.');
  }

  selected = '';
  myworkspaces: any[] = [];
  ngOnInit() {
    this.selected = 'workspaces';
    this.route.url.subscribe((urlSegment) => {
      this.currentPath = urlSegment[0].path;
      if (this.currentPath == 'my-workspaces') {
        this.fetchMyWorkspace();
      } else {
        this.fetchAllWorkspaces();
      }
    });
  }
  fetchAllWorkspaces() {
    this.workspacesService.getAllWorkspaces(this.page).subscribe({
      next: (response: any) => {
        console.log(response.workspaces);
        this.myworkspaces = response.workspaces;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  fetchMyWorkspace() {
    this.workspacesService.getMyWorkspaces(this.page).subscribe({
      next: (response: any) => {
        console.log(response.workspaces);
        this.myworkspaces = response.workspaces;
        this.totalPages = response.totalPages;
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
