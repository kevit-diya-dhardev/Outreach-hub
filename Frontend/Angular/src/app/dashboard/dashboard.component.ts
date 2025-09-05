import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router) {}
  navigateToWorkspaces() {
    this.router.navigate(['/admin/workspaces']);
  }
  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }
}
