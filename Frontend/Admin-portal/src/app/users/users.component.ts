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
  isEditForm!: boolean;
  user!: any;
  page: number = 1;
  totalPages!: number;
  currentPath!: string;
  increasePage() {
    this.page++;
    if (this.currentPath == 'my-users') {
      this.fetchMyUsers();
    } else {
      this.fetchAllUsers();
    }
  }

  decreasePage() {
    this.page--;
    if (this.currentPath == 'my-users') {
      this.fetchMyUsers();
    } else {
      this.fetchAllUsers();
    }
  }
  openUserFormVisible() {
    this.userFormVisible = true;
  }

  recieveData(data: { isuserFormVisible: boolean; editformAllowed: boolean }) {
    this.userFormVisible = data.isuserFormVisible;
    this.isEditForm = data.editformAllowed;
    if (this.currentPath === 'my-users') {
      this.fetchMyUsers();
    } else {
      this.fetchAllUsers();
    }
  }

  deleteUser(id: string) {
    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        if (this.currentPath === 'my-users') {
          this.fetchMyUsers();
        } else {
          this.fetchAllUsers();
        }
      },
      error: (error) => {
        console.log('Error ', error);
      },
    });
  }
  editUser(user: any) {
    this.isEditForm = true;
    this.user = { name: user.name, email: user.email, _id: user._id };
    console.log('Edit form success');
    this.userFormVisible = true;
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
      this.currentPath = urlSegment[0].path;
      if (this.currentPath === 'my-users') {
        this.fetchMyUsers();
      } else {
        this.fetchAllUsers();
      }
    });
  }
  fetchAllUsers() {
    this.usersService.getAllUsers(this.page).subscribe({
      next: (response: any) => {
        this.users = response.findUsers;
        this.totalPages = response.totalPages;
        console.log(this.totalPages);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  fetchMyUsers() {
    this.usersService.getMyUsers(this.page).subscribe({
      next: (response: any) => {
        this.users = response.findUsers;
        this.totalPages = response.totalPages;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
