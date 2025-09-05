import { Component } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UsersServices } from './users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  deleteUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private usersService: UsersServices) {}
  selected = '';
  users: any[] = [];

  ngOnInit() {
    this.selected = 'users';
    this.usersService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
