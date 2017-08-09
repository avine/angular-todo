import { Component, OnInit } from '@angular/core';

import { ListService } from '../../list/list.service';
import { ListItemModel } from '../../list/listItem.model';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  title: string;

  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  onCreate() {
    if (this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }
}
