import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TodoModel } from '../../todo/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() item: TodoModel;
  @Output() statusChanged: EventEmitter<any> = new EventEmitter();
  isEdited = false;

  constructor() {
  }

  onCheck() {
    this.statusChanged.emit({ type: 'done', value: this.item.done });
  }

  onEdit(updateRef) {
    this.isEdited = true;
    try {
      updateRef.focus();
    } catch (e) {}
  }

  onUpdate(form) {
    if (form.value.title) {
      this.item.title = form.value.title;
      this.isEdited = false;
      this.statusChanged.emit({ type: 'rename', value: this.item.title });
    } else {
      this.onArchive();
    }
  }

  onCancel(updateRef) {
    this.isEdited = false;
    updateRef.value = this.item.title;
  }

  onArchive() {
    this.statusChanged.emit({ type: 'archive' });
  }
}
