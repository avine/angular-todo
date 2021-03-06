import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './data/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // FIXME: do we have to care about `.unsubscribe` the following subscription ?
    // And how many subscribtion is there ???
    return new Promise<boolean>(resolve => this.authService.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth']);
        resolve(false);
      } else {
        resolve(true);
      }
    }));
  }
}
