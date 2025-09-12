import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { WorkspacesServices } from '../workspaces.service';
import { Workspace } from '../models/workspace';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrl: './create-workspace.component.scss',
})
export class CreateWorkspaceComponent {
  error = false;
  success = false;
  @Output() isUserCreated = new EventEmitter<boolean>();
  constructor(
    private workspaceService: WorkspacesServices,
    private fb: FormBuilder
  ) {}
  workspaceForm = this.fb.group(
    {
      workspace_id: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
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

  onSubmit() {
    const workspace: Workspace = this.workspaceForm.getRawValue();
    this.workspaceService.createWorkspaces(workspace).subscribe({
      next: (response) => {
        console.log('Workspace created:', response);
        this.success = true;
        this.workspaceForm.reset();
        this.isUserCreated.emit(true);
      },
      error: (err) => {
        alert(err.error.message);
        console.log('Error creating workspace:', err.error.message);
      },
    });
  }
}
