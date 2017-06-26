import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() title: string;
  @Input() done: boolean;
  isEdited: boolean = false;

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  onCheck() {
    this.changeStatus.emit({ type: 'done', value: this.done });
  }

  onEdit(updateRef) {
    this.isEdited = true;
    setTimeout(() => updateRef.focus(), 0); // Hack: wait for the next UI repaint (when the input is visible...)
  }

  onUpdate(form) {
    if (form.value.title) {
      this.title = form.value.title;
      this.isEdited = false;
    } else {
      this.onDelete();
    }
  }

  onCancel() {
    this.isEdited = false;    
  }

  onDelete() {
    this.changeStatus.emit({ type: 'delete' });
  }
}
