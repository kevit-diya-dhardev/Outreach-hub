import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workspace } from '../models/workspace';
import { user } from '../../users/models/user';

@Component({
  selector: 'app-view-workspace',
  templateUrl: './view-workspace.component.html',
  styleUrl: './view-workspace.component.scss',
})
export class ViewWorkspaceComponent {
  @Input() workspace!: Workspace;
  @Input() users!: any;
  @Output() viewWorkspaceVisible = new EventEmitter<boolean>();

  closeForm() {
    this.viewWorkspaceVisible.emit(false);
  }
  
  ngOnInit(){
    
  }
}
