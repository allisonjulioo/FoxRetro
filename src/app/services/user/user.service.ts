import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/get-users`);
  }

  getById(id: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((res) => res));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/register`, user);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
  }
}
