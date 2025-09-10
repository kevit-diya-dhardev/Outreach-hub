import { Component } from '@angular/core';
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
    if (this.workspaceForm.valid) {
      const workspace: Workspace = this.workspaceForm.getRawValue();

      this.workspaceService.createWorkspaces(workspace).subscribe({
        next: (response) => {
          console.log('Workspace created:', response);
          this.workspaceForm.reset();
        },
        error: (err) => {
          alert(err.error.message);
          console.log('Error creating workspace:', err.error.message);
        },
      });
    } else {
      this.workspaceForm.markAllAsTouched(); // show errors
    }
  }
}
