import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ListItemModel } from '../../list/listItem.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() item: ListItemModel;
  @Output() statusChanged: EventEmitter<any> = new EventEmitter();
  isEdited = false;

  constructor() {

  }

  ngOnInit() {
  }

  onCheck() {
    this.statusChanged.emit({ type: 'done', value: this.item.done });
  }

  onEdit(updateRef) {
    this.isEdited = true;
    updateRef.focus();
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
