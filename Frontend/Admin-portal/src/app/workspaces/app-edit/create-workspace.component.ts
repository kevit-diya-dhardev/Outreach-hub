import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { WorkspacesServices } from '../workspaces.service';
import { Workspace } from '../models/workspace';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrl: './create-workspace.component.scss',
})
export class CreateWorkspaceComponent {
  error = false;
  success = false;
  @Output() isWorkspaceCreated = new EventEmitter<boolean>();
  @Input() mode!: string;
  @Input() workspaceData!: Workspace;
  constructor(
    private workspaceService: WorkspacesServices,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  getEditFormData() {
    this.workspaceForm.patchValue(this.workspaceData);
  }
  ngOnInit() {
    if (this.mode == 'edit') {
      this.getEditFormData();
    }
  }
  workspaceForm = this.fb.group(
    {
      workspace_name: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    { nonNullable: true }
  );

  editForm() {
    const workspace: Workspace = this.workspaceForm.getRawValue();
    this.workspaceService
      .editWorkspace(this.workspaceData._id!, workspace)
      .subscribe({
        next: (response) => {
          this.snackbarService.show('Workspace edited successfully', 'success');
          this.success = true;
          this.workspaceForm.reset();
          this.isWorkspaceCreated.emit(true);
        },
        error: (err) => {
          this.snackbarService.show(err.error.message, 'error');
          console.log('Error creating workspace:', err.error.message);
        },
      });
  }

  createForm() {
    const workspace: Workspace = this.workspaceForm.getRawValue();
    this.workspaceService.createWorkspaces(workspace).subscribe({
      next: (response) => {
        this.snackbarService.show('Workspace created successfully', 'success');
        this.success = true;
        this.workspaceForm.reset();
        this.isWorkspaceCreated.emit(true);
      },
      error: (err) => {
        this.snackbarService.show(err.error.message, 'error');
        console.log('Error creating workspace:', err.error.message);
      },
    });
  }
  onSubmit() {
    if (this.mode == 'edit') {
      this.editForm();
    } else {
      this.createForm();
    }
  }
}
