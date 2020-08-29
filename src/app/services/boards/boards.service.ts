import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Boards } from 'src/app/models/boards/boards';
import { User } from 'src/app/models/user/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardsService implements OnInit {
  public userId: string;
  constructor(private http: HttpClient, private cookie: CookieService) {
    this.userId = this.cookie.get('uid');
  }
  ngOnInit(): void {
    console.log(this.userId);
  }

  getAll() {
    return this.http.get<Boards[]>(
      `${environment.apiUrl}/users/${this.userId}/boards`
    );
  }
  getById(id: number) {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${this.userId}/boards/${id}`)
      .pipe(map((res: User) => res));
  }
  create(board: Boards) {
    return this.http.post(
      `${environment.apiUrl}/users/${this.userId}/boards`,
      board
    );
  }
  update(board: Boards) {
    return this.http.patch(
      `${environment.apiUrl}/users/${this.userId}/boards/${board.id}`,
      board
    );
  }
  delete(id: number) {
    return this.http.delete(
      `${environment.apiUrl}/users/${this.userId}/boards/${id}`
    );
  }
}
