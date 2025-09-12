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
  @Input() isEditForm: boolean = false;
  @Input() user: any;
  success = false;
  closeAddUserModal() {
    this.userFormVisible = false;
    this.isEditForm = false;
    this.dataEvent.emit({ editformAllowed: false, isuserFormVisible: false });
  }

  @Output() dataEvent = new EventEmitter<{
    isuserFormVisible: boolean;
    editformAllowed: boolean;
  }>();
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
    this.userForm.get('workspace_id')?.setValue(workspace._id);
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
    if (this.isEditForm) {
      return this.editUser();
    }
    this.userService.createUser(this.userForm.getRawValue()).subscribe({
      next: (response) => {
        console.log('User created successfully');
        this.success = true;
        this.dataEvent.emit({
          isuserFormVisible: false,
          editformAllowed: false,
        });
      },
      error: (error) => {
        console.error('Error creating user' + error);
      },
    });
  }
  editUser() {
    this.userService
      .editUser(this.user._id, this.userForm.getRawValue())
      .subscribe({
        next: (response) => {
          console.log('Edited user');
          this.dataEvent.emit({
            isuserFormVisible: false,
            editformAllowed: false,
          });
        },
        error: (error) => {
          console.log('editedUser');
        },
      });
  }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', { validators: [Validators.required] }],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(6)],
        },
      ],
      role: ['', { validators: [Validators.required] }],
      workspace_id: ['', Validators.required],
    });
    this.fetchWorkspaces();
  }
  fetchWorkspaces() {
    this.workspaceService
      .getAllWorkspaces(1)
      .pipe(
        map((res: any) => {
          this.workspaceList = res.workspaces;
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
