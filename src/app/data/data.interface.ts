import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TodoModel } from '../todo/todo.model';

export interface IAuth {
  user: ReplaySubject<any>;
  signUp(email: string, password: string);
  signIn(email: string, password: string);
  signOut();
}

export interface IDatabase {
  getList(): ReplaySubject<TodoModel[]>;
  setList(list: TodoModel[]): any;
}
