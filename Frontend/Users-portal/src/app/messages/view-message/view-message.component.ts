import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.scss',
})
export class ViewMessageComponent {
  @Input() messageData: any;
  
  @Output() viewMessageVisible = new EventEmitter();
  closeForm() {
    this.viewMessageVisible.emit(false);
  }

  
}
