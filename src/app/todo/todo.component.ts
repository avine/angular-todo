import { Component, OnInit } from '@angular/core';
import { ListService } from '../list/list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  listService: ListService;
  title: string;

  constructor(listService: ListService) {
    this.listService = listService;
  }

  ngOnInit() {
  }

  onCreate() {
    if (this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }

  onChangeStatus(event, index) {
    switch (event.type) {
      case 'done':
        this.listService.done(index, event.value);
      break;
      case 'delete':
        this.listService.delete(index);
      break;
    }
  }

  remain(): number {
    let count = 0;
    this.listService.list.forEach(function (item) {
      if (!item.done) {
        count++;
      }
    });
    return count;
  }

  remainBadge() {
    const remain = this.remain() / this.listService.length();
    let badgeColor;
    if (remain >= 0.75) {
      badgeColor = 'danger';
    } else if (remain >= 0.5) {
      badgeColor = 'warning';
    } else if (remain >= 0.25) {
      badgeColor = 'info';
    } else {
      badgeColor = 'success';
    }
    return `badge-${badgeColor}`;
  }
}
