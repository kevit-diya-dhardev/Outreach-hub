import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServices } from './dashboard.service';
import { Workspace } from '../workspaces/models/workspace';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private dashboardService: DashboardServices
  ) {}
  totalWorkspaces!: number;
  totalUsers!: number;
  workspaces!: Workspace[];
  recentOnes!: Workspace[];
  ngOnInit() {
    this.dashboardService.getUsers().subscribe({
      next: (response: any) => {
        this.totalUsers = response.totalDocs;
      },
      error: (error) => {
        console.error(error);
        if (error.error.message == 'Unauthorized') {
          this.router.navigate(['/login']);
        }
      },
    });

    this.dashboardService.getWorkspaces().subscribe({
      next: (response: any) => {
        this.totalWorkspaces = response.totalDocs;
        this.workspaces = response.workspaces;
        this.recentOnes = this.workspaces.slice(0, 3);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  navigateToWorkspaces() {
    this.router.navigate(['/admin/my-workspaces']);
  }
  navigateToUsers() {
    this.router.navigate(['/admin/my-users']);
  }
}
