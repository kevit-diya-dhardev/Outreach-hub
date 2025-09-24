import { Component } from '@angular/core';
import { JwtService } from '../jwt.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user: any;
  workspaces!: any;
  isOpen: boolean = false;
  selectedOne!: any;
  isWorkspaceSelected: any;
  isListVisible: any = false;
  selectedWorkspace!: string;
  username!: string;
  constructor(
    private jwtService: JwtService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}
  ngOnInit() {
    if (localStorage.getItem('workspace_id')) {
      this.isWorkspaceSelected = true;
      this.username = localStorage.getItem('username')!;
      this.selectedOne = localStorage.getItem('workspace_id');
      this.selectedWorkspace = localStorage.getItem('workspace_name')!;
    }

    this.getLoginUser();
  }
  getLoginUser() {
    const token: string = localStorage.getItem('token')!;
    const decoded = this.jwtService.decode(token);
    console.log(decoded.userId);
    this.dashboardService.getUser(decoded.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        localStorage.setItem('role', response.role);
        localStorage.setItem('username', this.user.name);
        this.workspaces = response.workspace_id;
        this.username = this.user.name;
      },
      error: (error) => {
        console.log('error respone: ', error);
        if (error.error.message == 'Unauthorized') {
          this.router.navigate(['/login']);
        }
      },
    });
  }
  selectWorkspace(ws: any) {
    this.selectedOne = ws._id;
    this.selectedWorkspace = ws.workspace_name;
    this.isListVisible = !this.isListVisible;
    localStorage.setItem('workspace_id', this.selectedOne);
    localStorage.setItem('workspace_name', this.selectedWorkspace);
    this.isWorkspaceSelected = true;
    this.getLoginUser();
  }
}
