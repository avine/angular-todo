import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ListItemModel } from './list/listItem.model';

@Injectable()
export class DatabaseService {
  items: FirebaseObjectObservable<any[]>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.items = this.afDatabase.object('/list');
  }

  getList() {
    return this.items;
  }

  setList(list: ListItemModel[]) {
    return this.items.set(list).catch(error => console.error(error)); // TODO: improve...
  }
}
