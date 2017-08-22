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
  error: { code: string, message: string };

  constructor(public authService: AuthService) {
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
    this.authService.signUp(email, password).catch(error => {
      this.showError(error);
    });
  }

  signIn(email: string, password: string) {
    this.authService.signIn(email, password).catch(error => {
      this.showError(error);
    });
  }

  onSignOut() {
    this.hideError();
    this.authService.signOut().catch(error => {
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
