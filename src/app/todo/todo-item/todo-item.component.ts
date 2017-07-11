import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() title: string;
  @Input() done: boolean;
  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  isEdited: boolean = false;

  constructor() {

  }

  ngOnInit() {
  }

  onCheck() {
    this.changeStatus.emit({ type: 'done', value: this.done });
  }

  onEdit(updateRef) {
    this.isEdited = true;
    updateRef.focus();
  }

  onUpdate(form) {
    if (form.value.title) {
      this.title = form.value.title;
      this.isEdited = false;
    } else {
      this.onDelete();
    }
  }

  onCancel(updateRef) {
    this.isEdited = false; 
    updateRef.value = this.title;   
  }

  onDelete() {
    this.changeStatus.emit({ type: 'delete' });
  }
}
