import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from './auth.service';
import { ListItemModel } from './list/listItem.model';

@Injectable()
export class DatabaseService {
  private ref: FirebaseObjectObservable<any[]>;
  private list = new ReplaySubject<any>(1);

  constructor(private authService: AuthService, private afDatabase: AngularFireDatabase) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.ref = this.afDatabase.object(`/${user.uid}`);
        this.ref.subscribe(list => this.list.next(list));
      } else {
        this.ref = null;
        this.list.next([]);
      }
    });
  }

  getList() {
    return this.list;
  }

  setList(list: ListItemModel[]) {
    return this.ref.set(list).catch(error => console.error(error)); // TODO: improve...
  }
}
