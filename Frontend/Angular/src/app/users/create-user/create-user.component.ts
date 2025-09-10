import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkspacesServices } from '../../workspaces/workspaces.service';
import { map } from 'rxjs';
import { UsersServices } from '../users.services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  isOpen = false;
  selectedRole: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.isOpen = false;
  }
  userForm: any;
  workspaceList!: string[];
  constructor(
    private fb: FormBuilder,
    private workspaceService: WorkspacesServices,
    private userService: UsersServices
  ) {}
  createUser() {
    this.userService.createUser(this.userForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('User created successfully');
      },
      error: (error) => {
        console.error('Error creating user' + error);
      },
    });
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', { validators: [Validators.required], nonNullable: true }],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(6)],
          nonNullable: true,
        },
      ],
      role: ['', { validators: [Validators.required], nonNullable: true }],
      workspace_id: ['', Validators.required],
    });
  }
  addWorkspace() {
    return this.workspaceService.getAllWorkspaces().subscribe({
      next: (response: any) => {
        this.workspaceList.push(response.workspace_id);
      },
    });
  }
}
