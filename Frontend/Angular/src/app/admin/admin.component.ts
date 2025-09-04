import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(private adminService: AdminService) {}
  selected: string = '';
  workspaces: any[] = [];
  users: any[] = [];

  getWorkspaces() {
    this.selected = 'workspaces';
    this.adminService.getWorkspaces().subscribe({
      next: (response: any) => {
        this.workspaces = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUsers() {
    this.selected = 'users';
    this.adminService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
