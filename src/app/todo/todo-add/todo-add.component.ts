import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ListService } from '../../list/list.service';
import { ListItemModel } from '../../list/listItem.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  title: string;
  filter: string;
  role = 'add';
  @Output() filtered: EventEmitter<any> = new EventEmitter();

  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  onCreate() {
    if (this.role === 'add' && this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }

  onFilter() {
    this.filtered.emit(this.filter);
  }

  onSwitchRole() {
    this.role = this.role === 'add' ? 'filter' : 'add';
    this.title = '';
    this.filter = '';
    this.filtered.emit('');
  }
}
