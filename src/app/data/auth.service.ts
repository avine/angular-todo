import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { IAuth } from './data.interface';

@Injectable()
export class AuthService implements IAuth {
  // TODO: wrap this in something like user.model.ts
  // an only expose that model
  public user = new ReplaySubject<firebase.User>(1);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => this.user.next(user));
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}
