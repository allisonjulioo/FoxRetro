import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  user_id: number;
  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService,
    private route: ActivatedRoute) {

    this.user_id = parseInt(this.cookie.get('uid'));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.user_id )
    const currentUser = this.auth.currentUserValue;
    if (this.user_id) {
      this.router.navigate(['/boards'], { queryParams: { returnUrl: state.url } });
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}