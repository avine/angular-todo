import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user = new ReplaySubject<firebase.User | null>(1);

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
