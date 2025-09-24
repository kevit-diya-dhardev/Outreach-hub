import { Component } from '@angular/core';
import { WorkspacesServices } from './workspaces.service';
import { Workspace } from './models/workspace';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrl: './workspaces.component.scss',
})
export class WorkspacesComponent {
  constructor(
    private workspacesService: WorkspacesServices,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  mode = '';
  totalPages!: number;
  currentPath!: string;
  page: number = 1;
  workspace!: Workspace;
  workspaceUsers: any;
  viewFormVisible = false;
  handleSuccess(value: boolean) {
    this.closeAddWorkspaceModal();
    if (this.currentPath == 'my-workspaces') {
      this.fetchMyWorkspace();
    } else {
      this.fetchAllWorkspaces();
    }
  }

  createMode() {
    this.mode = 'create';
    this.openAddWorkspaceModal();
  }
  editMode(workspace: Workspace) {
    this.mode = 'edit';
    this.workspace = workspace;
    this.openAddWorkspaceModal();
  }

  increasePage() {
    this.page++;
    if (this.currentPath == 'my-workspaces') {
      this.fetchMyWorkspace();
    } else {
      this.fetchAllWorkspaces();
    }
  }
  closeViewForm() {
    this.viewFormVisible = false;
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
          this.snackbarService.show(
            'workspace deleted successfully!',
            'success'
          );
        } else {
          this.snackbarService.show(
            'workspace deleted successfully!',
            'success'
          );
          this.fetchAllWorkspaces();
        }
      },
      error: (error) => {
        this.snackbarService.show(error.error.message, 'error');
      },
    });
  }

  viewUsers(workspace: Workspace) {
    this.workspacesService.getWorkspaceUsers(workspace._id!).subscribe({
      next: (response: any) => {
        this.workspaceUsers = response;
        this.viewFormVisible = true;
        this.workspace = workspace;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  recieveViewWorkspaceData(viewFormVisible: boolean) {
    this.viewFormVisible = viewFormVisible;
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
    this.currentPath = 'all-workspaces';
    this.workspacesService.getAllWorkspaces(this.page).subscribe({
      next: (response: any) => {
        console.log(response.workspaces);
        this.myworkspaces = response.workspaces;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.log(error);
        if (error.error.message == 'Unauthorized') {
          this.router.navigate(['/login']);
        }
      },
    });
  }
  fetchMyWorkspace() {
    this.currentPath = 'my-workspaces';
    this.workspacesService.getMyWorkspaces(this.page).subscribe({
      next: (response: any) => {
        console.log(response.workspaces);
        this.myworkspaces = response.workspaces;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.log(error);
        if (error.error.message == 'Unauthorized') {
          this.router.navigate(['/login']);
        }
      },
    });
  }
}
