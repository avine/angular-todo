import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ListService } from '../list/list.service';
import { ListItemModel } from '../list/listItem.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  list: ListItemModel[];
  title: string;
  subscription: Subscription;

  constructor(private listService: ListService) {
    this.listService = listService;
  }

  ngOnInit() {
    this.list = this.listService.get();
    this.subscription = this.listService.changed.subscribe(() => {
      this.list = this.listService.get();
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onCreate() {
    if (this.title) {
      this.listService.create(this.title);
      this.title = '';
    }
  }

  onChangeStatus(id, event) {
    switch (event.type) {
      case 'done':
        this.listService.done(id, event.value);
        break;

      case 'rename':
        this.listService.rename(id, event.value);
        break;

      case 'archive':
        this.listService.archive(id);
        break;
    }
  }

  remain(): number {
    let count = 0;
    this.list.forEach(function (item) {
      if (!item.done) {
        count++;
      }
    });
    return count;
  }

  remainBadge() {
    const remain = this.remain() / this.list.length;
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
