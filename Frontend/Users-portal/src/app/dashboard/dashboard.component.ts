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
  constructor(
    private jwtService: JwtService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}
  ngOnInit() {
    const token: string = localStorage.getItem('token')!;
    const decoded = this.jwtService.decode(token);
    console.log(decoded.userId);
    this.dashboardService.getUser(decoded.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        localStorage.setItem('role', response.role);
        this.workspaces = response.workspace_id;
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
    console.log('Workspace: ', this.selectedOne);
    this.isWorkspaceSelected = true;
  }
}
