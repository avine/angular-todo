import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ListItemModel } from './listItem.model';

@Injectable()
export class BackendService {
  items: FirebaseObjectObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = this.db.object('/list');
  }

  getList() {
    return this.items;
  }

  setList(list: ListItemModel[]) {
    return this.items.set(list).catch(error => console.error(error)); // TODO: improve...
  }
}
