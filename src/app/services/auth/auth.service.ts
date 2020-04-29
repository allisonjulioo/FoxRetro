import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../models/user/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(data) {
    const cookie = this.cookie.check('utok');
    return this.http.post<User>(`${environment.apiUrl}/auth`, { ...data })
      .pipe(map(user => {
        this.cookie.set('utok', user.token, 3600)
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  public logout() {
    // remove user from local storage and set current user to null
    this.cookie.delete('utok')
    this.currentUserSubject.next(null);
    localStorage.clear();
  }
}
