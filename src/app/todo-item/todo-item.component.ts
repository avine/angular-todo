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

  constructor() {

  }

  ngOnInit() {
  }

  onCheck() {
    this.changeStatus.emit({ type: 'done', value: this.done });
  }

  onDelete() {
    this.changeStatus.emit({ type: 'delete' });
  }
}
