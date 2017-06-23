import { Injectable } from '@angular/core';
import { ListItemModel } from './listItem.model';

const LIST = [{
    title: 'Acheter des fruits',
    done: true
  }, {
    title: 'Téléphoner à Lucien',
    done: false
  }];

@Injectable()
export class ListService {
  list: ListItemModel[];

  constructor() {
    this.list = LIST;
  }

  get() {
    return this.list;
  }

  create(title, done = false) {
    this.list.push({ title, done });
  }

  delete(index) {
    this.list.splice(index, 1);
  }

  done(index, status: boolean = true) {
    this.list[index].done = status;
  }

  length() {
    return this.list.length;
  }
}
