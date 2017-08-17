import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { ListItemModel } from './listItem.model';
import { BackendService } from './backend.service';

@Injectable()
export class ListService {
  list: ListItemModel[];
  changed = new Subject<string | void>();

  constructor(private backend: BackendService) {
    this.list = [];
    this.changed.subscribe(action => {
      if (action !== 'getList') {
        this.setList();
      }
    });
  }

  getList() {
    const list: FirebaseObjectObservable<any[]> = this.backend.getList();
    list.subscribe(response => {
      this.list = response;
      this.changed.next('getList');
    });
    return list;
  }

  setList() {
    return this.backend.setList(this.list);
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
    if (this.filterBy({ title, archived: false }).length) {
      return false;
    }
    this.list.push(new ListItemModel(title));
    this.changed.next('create');
    return true;
  }

  done(id: number, status: boolean = true) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.done = status;
        this.changed.next('done');
      }
    });
  }

  rename(id: number, title: string) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.title = title;
        this.changed.next('rename');
      }
    });
  }

  archive(id: number, archived = true) {
    this.list.forEach(item => {
      if (item.id === id && item.archived !== archived) {
        item.archived = archived;
        this.changed.next('archive');
      }
    });
  }

  delete(id: number) {
    const length = this.list.length;
    this.list = this.list.filter(item => {
      return item.id !== id;
    });
    if (this.list.length !== length) {
      this.changed.next('delete');
    }
  }

  filterBy(map: {}) {
    return this.list.filter(item => {
      for (const prop in map) {
        if (item[prop] !== map[prop]) {
          return false;
        }
      }
      return true;
    });
  }
}
