import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Boards } from 'src/app/models/boards/boards';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  public user_id: any;
  constructor(
    private http: HttpClient,
    private cookie: CookieService) {
    this.user_id = this.cookie.get('uid');
  }

  getAll() {
    return this.http.get<Boards[]>(`${environment.apiUrl}/users/${this.user_id}/boards`);
  }
  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${this.user_id}/boards/${id}`)
      .pipe(map(res => res));
  }
  create(board: Boards) {
    return this.http.post(`${environment.apiUrl}/users/${this.user_id}/boards`, board);
  }
  update(board: Boards) {
    return this.http.patch(`${environment.apiUrl}/users/${this.user_id}/boards/${board.id}`, board);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${this.user_id}/boards/${id}`);
  }
}
