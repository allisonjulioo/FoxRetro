import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Column } from 'src/app/models/columns/columns';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  public user_id: any;
  constructor(
    private http: HttpClient,
    private cookie: CookieService) {
    this.user_id = this.cookie.get('uid');
  }

  getAll(id: number) {
    return this.http.get<Column[]>(`${environment.apiUrl}/users/${this.user_id}/boards/${id}/columns`);
  }
  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${this.user_id}/boards/${id}`)
      .pipe(map(res => res))
  }
  create(column: Object, board_id: number) {
    return this.http.post(`${environment.apiUrl}/users/${this.user_id}/boards/${board_id}/columns`, column);
  }
  update(column: Column) {
    return this.http.patch(`${environment.apiUrl}/users/${this.user_id}/boards/${column.board_id}/columns/${column.id}`, column);
  }
  delete(id: number, board_id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${this.user_id}/boards/${board_id}/columns/${id}`);
  }
}
