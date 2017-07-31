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

  get(archived = false) {
    return this.list.filter(item => {
      return item.archived === archived
    });
  }

  length(archived = false) {
    return this.get(archived).length;
  }

  create(title, done = false) {
    this.list.push({ title, done, archived: false });
    this.changed.next();
  }

  done(index: number, status: boolean = true) {
    this.get()[index].done = status;
    this.changed.next();
  }

  rename(index: number, title: string) {
    this.get()[index].title = title;
    this.changed.next();
  }

  archive(index) {
    this.get()[index].archived = true;
    this.changed.next();
  }

  /*delete(index) { // TODO: it's not clear what is the index...
    this.list.splice(index, 1);
    this.changed.next();
  }*/
}
