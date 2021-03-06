import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';

import { AuthService } from '../data/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  action = '';
  isNewUser = false;
  isFormDisabled = false;
  error: { code: string, message: string };

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      this.action = user ? 'logout' : 'login';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this.handleAction(this.authService.signUp(email, password).then(
      () => this.router.navigate(['/todo/all'])
    ));
  }

  signIn(email: string, password: string) {
    this.handleAction(this.authService.signIn(email, password).then(
      () => this.router.navigate(['/todo/all'])
    ));
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
