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
    if (this.isSidebarCollapsed == true) {
      this.isUsersMenuOpen = false;
      this.isWorkspacesMenuOpen = false;
    }
  }
  toggleWorkspacesMenu(): void {
    if (this.isSidebarCollapsed == true) {
      this.isWorkspacesMenuOpen = false;
    } else {
      this.isWorkspacesMenuOpen = !this.isWorkspacesMenuOpen;
    }
  }
  toggleUsersMenu(): void {
    if (this.isSidebarCollapsed == true) {
      this.isUsersMenuOpen = false;
    } else {
      this.isUsersMenuOpen = !this.isUsersMenuOpen;
    }
  }
}
