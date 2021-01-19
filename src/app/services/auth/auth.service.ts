import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { User } from './../../models/user/user';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(data: Auth): Observable<Auth> {
    return this.http.post<Auth & User>(`${environment.apiUrl}/authentication`, { ...data })
      .pipe(map(user => {
        this.cookie.set('utok', user.token, 3600);
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  public register(user: User): Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiUrl}/register`, { ...user })
      .pipe(map((data: Auth) => data));
  }
  public remind(email: string): Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiUrl}/remind`, { email })
      .pipe(map((data: Auth) => data));
  }

  public logout() {
    this.cookie.delete('utok');
    this.currentUserSubject.next(null);
    localStorage.clear();
  }
}
