import { Component } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UsersServices } from './users.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  userFormVisible: boolean | null = false;
  openUserFormVisible() {
    this.userFormVisible = true;
  }

  recieveData(data: boolean) {
    this.userFormVisible = data;
  }

  deleteUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  viewUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private usersService: UsersServices,
    private route: ActivatedRoute
  ) {}
  selected = '';
  users: any[] = [];

  ngOnInit() {
    this.selected = 'users';
    this.route.url.subscribe((urlSegment) => {
      const currentPath: string = urlSegment[0].path;
      if (currentPath === 'my-users') {
        this.usersService.getMyUsers().subscribe({
          next: (response: any) => {
            this.users = response;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      } else {
        this.usersService.getAllUsers().subscribe({
          next: (response: any) => {
            this.users = response;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }
}
