import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ListItemModel } from './listItem.model';

// @Injectable()
export class ListService {
  list: ListItemModel[];
  changed = new Subject<void>();

  constructor() {
    this.list = [];
  }

  get(archived = false, status = 'all') {
    return this.list.filter(item => {
      return item.archived === archived && (
        (status === 'all' || !status) ||
        status === 'done' && item.done ||
        status === 'left' && !item.done
      );
    });
  }

  length(archived = false) {
    return this.get(archived).length;
  }

  create(title) {
    this.list.push(new ListItemModel(title));
    this.changed.next();
  }

  done(id: number, status: boolean = true) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.done = status;
        this.changed.next();
      }
    });
  }

  rename(id: number, title: string) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.title = title;
        this.changed.next();
      }
    });
  }

  archive(id: number, archived = true) {
    this.list.forEach(item => {
      if (item.id === id && item.archived !== archived) {
        item.archived = archived;
        this.changed.next();
      }
    });
  }

  delete(id: number) {
    const length = this.list.length;
    this.list = this.list.filter(item => {
      return item.id !== id;
    });
    if (this.list.length !== length) {
      this.changed.next();
    }
  }
}
