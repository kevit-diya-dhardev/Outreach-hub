import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-conatct',
  templateUrl: './view-conatct.component.html',
  styleUrl: './view-conatct.component.scss',
})
export class ViewConatctComponent {
  @Output() viewFormVisible = new EventEmitter();
  @Input() contactData: any;
  close() {
    this.viewFormVisible.emit(false);
  }
}
