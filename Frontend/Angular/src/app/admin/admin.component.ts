import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isWorkspacesMenuOpen: boolean = false;
  isUsersMenuOpen: boolean = false;
  constructor(private adminService: AdminService, private router: Router) {}
  isSidebarCollapsed = false;
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  toggleWorkspacesMenu(): void {
    this.isWorkspacesMenuOpen = !this.isWorkspacesMenuOpen;
  }
  toggleUsersMenu(): void {
    this.isUsersMenuOpen = !this.isUsersMenuOpen;
  }
}
