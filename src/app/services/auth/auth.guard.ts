import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  token: string;
  private currentToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentToken = this.currentToken$.asObservable();

  constructor(private cookieService: CookieService, private router: Router) {
    this.token = this.cookieService.get('utok');
  }

  public async checkIfUserLogged(): Promise<void> {
    this.token = this.getToken();
    if (!this.token) {
      this.cookieService.deleteAll();
      this.router.navigate(['auth', 'login']);
    }
  }
  public getToken(): string {
    const token = this.cookieService.get('utok');
    this.currentToken$.next(token);
    return token;
  }
  canActivate(): Observable<boolean> | boolean {
    this.checkIfUserLogged();
    return !!this.token;
  }
}
