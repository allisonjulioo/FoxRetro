import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  constructor(
    @Inject('collection') public collection: string,
    public http: HttpClient
  ) {}
  public get(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${this.collection}`);
  }
  public find(id: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrl}/${this.collection}/${id}`)
      .pipe(map((res: T) => res));
  }
  public create(data: T): Observable<T> {
    return this.http.post<T>(
      `${environment.apiUrl}/${this.collection}/new`,
      data
    );
  }
  public update(data: T): Observable<T> {
    return this.http.patch<T>(
      `${environment.apiUrl}/${this.collection}/${data['id']}`,
      data
    );
  }
  public delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/${this.collection}/${id}`);
  }
  public search(data: { value: string; key: string }): Observable<T[]> {
    return this.http.post<T[]>(
      `${environment.apiUrl}/get-all-${this.collection}/search`,
      data
    );
  }
}
