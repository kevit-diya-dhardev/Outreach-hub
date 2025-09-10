import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() userFormVisible: any = true;
  success = false;
  closeAddUserModal() {
    this.userFormVisible = false;
    this.dataEvent.emit(this.userFormVisible);
  }
  openUserFormVisible() {}

  @Output() dataEvent = new EventEmitter<boolean>();
  isOpen = false;
  openDropdown: 'role' | 'workspace_id' | null = null;

  selectedRole: string | null = null;
  selectedWorkspace: any | null = null;

  toggleDropdown(type: 'role' | 'workspace_id') {
    this.openDropdown = this.openDropdown === type ? null : type;
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.userForm.get('role')?.setValue(role);
    this.openDropdown = null;
  }

  selectWorkspace(workspace: any) {
    this.selectedWorkspace = workspace.workspace_name;
    this.userForm.get('workspace_id')?.setValue(workspace.workspace_id);
    this.openDropdown = null;
  }

  userForm: any;
  workspaceList!: any[];
  constructor(
    private fb: FormBuilder,
    private workspaceService: WorkspacesServices,
    private userService: UsersServices
  ) {}
  createUser() {
    this.userService.createUser(this.userForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('User created successfully');
        this.success = true;
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
    this.workspaceService
      .getAllWorkspaces()
      .pipe(
        map((res: any) => {
          this.workspaceList = res;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('Success');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
