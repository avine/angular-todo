import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { IDatabase } from './data.interface';
import { AuthService } from './auth.service';
import { TodoModel } from '../todo/todo.model';

@Injectable()
export class DatabaseService implements IDatabase {
  private ref: FirebaseObjectObservable<any[]>;
  private list = new ReplaySubject<TodoModel[]>(1);

  constructor(private authService: AuthService, private afDatabase: AngularFireDatabase) {
    let subscription;
    this.authService.user.subscribe(user => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (user) {
        this.ref = this.afDatabase.object(`/${user.uid}`);
        subscription = this.ref.subscribe(list => {
          return this.list.next(list.length ? list.slice() : null);
        });
      } else {
        this.ref = null;
        this.list.next(null);
      }
    });
  }

  getList() {
    return this.list;
  }

  setList(list: TodoModel[]) {
    if (this.ref) {
      return this.ref.set(list).catch(error => console.error(error)); // TODO: improve error handling...
    }
  }
}
