import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TodoModel } from './todo.model';
import { DatabaseService } from '../data/database.service';

@Injectable()
export class TodoService {
  private list: TodoModel[] = [];
  private changed = new ReplaySubject<TodoModel[]>(1);

  constructor(private databaseService: DatabaseService) {
    this.databaseService.getList().subscribe(list => {
      this.list = list || [];
      this.changed.next(this.list);
    });
  }

  getList() {
    return this.changed;
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
      this.done(match[0].id, false);
      return true;
    }
    this.list.push(new TodoModel(title));
    this.setList();
    return true;
  }

  done(id: number, status: boolean = true) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.done = status;
        this.setList();
      }
    });
  }

  rename(id: number, title: string) {
    this.list.forEach(item => {
      if (item.id === id) {
        item.title = title;
        this.setList();
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
        this.setList();
      }
    });
  }

  delete(id: number) {
    const length = this.list.length;
    this.list = this.list.filter(item => {
      return item.id !== id;
    });
    if (this.list.length !== length) {
      this.setList();
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
