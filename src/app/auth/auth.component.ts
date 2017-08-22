import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: firebase.User | null;
  action = '';
  isNewUser = false;
  isFormDisabled = false;
  error: { code: string, message: string };

  constructor(public authService: AuthService) {
    if (this.authService.initialized) {
      const currentUser = this.authService.currentUser();
      this.user = currentUser || null;
      this.action = this.user ? 'logout' : 'login';
    }
    this.authService.user.subscribe(user => {
      this.user = user || null;
      this.action = this.user ? 'logout' : 'login';
    });
  }

  ngOnInit() {
  }

  onSign(form) {
    this.hideError();
    const email = form.value.email;
    const password = form.value.password;
    if (this.isNewUser) {
      this.signUp(email, password);
    } else {
      this.signIn(email, password);
    }
  }

  signUp(email: string, password: string) {
    this.handleAction(this.authService.signUp(email, password));
  }

  signIn(email: string, password: string) {
    this.handleAction(this.authService.signIn(email, password));
  }

  onSignOut() {
    this.hideError();
    this.handleAction(this.authService.signOut());
  }

  handleAction(promise: firebase.Promise<any>) {
    this.isFormDisabled = true;
    promise.then(
      () => this.isFormDisabled = false
    ).catch(error => {
      this.isFormDisabled = false;
      this.showError(error);
    });
  }

  showError(error) {
    this.error = error;
  }

  hideError() {
    this.error = null;
  }
}
