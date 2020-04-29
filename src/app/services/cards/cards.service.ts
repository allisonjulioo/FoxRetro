import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Cards } from 'src/app/models/cards/cards';
import { ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public user_id: number;
  public board_id: number;
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private route: ActivatedRoute) {
    this.user_id = parseInt(this.cookie.get('uid'));
  }

  getAll(id: number) {
    return this.http.get<Cards[]>(`${environment.apiUrl}/users/${this.user_id}/boards/${this.board_id}/columns/`);
  }
  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${this.user_id}/boards/${id}`)
      .pipe(map(res => res))
  }
  create(card: Cards, id: number) {
    return this.http.post(`${environment.apiUrl}/users/${this.user_id}/columns/${id}/cards`, card);
  }
  update(card: Cards) {
    return this.http.patch(`${environment.apiUrl}/users/${this.user_id}/columns/${card.column_id}/cards/${card.id}`, card);
  }
  delete(card: Cards) { 
    return this.http.delete(`${environment.apiUrl}/users/${this.user_id}/columns/${card.column_id}/cards/${card.id}`);
  }
}
