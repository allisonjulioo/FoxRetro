import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Teams } from 'src/app/models/teams/teams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  public user_id: number;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.user_id = parseInt(this.cookie.get('uid'), 0);
  }

  getAll() {
    return this.http.get<Teams[]>(`${environment.apiUrl}/${this.user_id}/teams`);
  }
  create(team: Teams) {
    return this.http.post(`${environment.apiUrl}/${this.user_id}/teams/new`, team);
  }
  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/teams/${this.user_id}/${id}`)
      .pipe(map(res => res));
  }
  update(team: Teams) {
    return this.http.patch(`${environment.apiUrl}/teams/${this.user_id}/${team.id}`, team);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/teams/${this.user_id}/${id}`);
  }
}
