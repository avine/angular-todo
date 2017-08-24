import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { TodoModel } from './todo.model';
import { DatabaseService } from '../data/database.service';

@Injectable()
export class TodoService {
  private list: TodoModel[]; // TODO: remove this varilable and simply use the last emitted value in ReplaySubject
  public changed = new Subject<string | void>(); // TODO: remove this varilable and simply use the last emitted value in ReplaySubject

  constructor(private databaseService: DatabaseService) {
    this.list = [];
    this.changed.subscribe(action => {
      if (action !== 'getList') {
        this.setList();
      }
    });
  }

  getList() {
    const list: ReplaySubject<any> = this.databaseService.getList();
    list.subscribe(response => {
      this.list = response.length ? [].concat(response) : [];
      this.changed.next('getList');
    });
    return list;
  }

  setList() {
    return this.databaseService.setList(this.list);
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
    const match = this.filterBy({ title });
    if (match.length) {
      if (!match[0].archived) {
        return false;
      }
      this.archive(match[0].id, false);
      return true;
    }
    this.list.push(new TodoModel(title));
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
        if (!archived) {
          item.id = TodoModel.getId();
        }
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
