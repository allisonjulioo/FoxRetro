import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Column } from 'src/app/models/columns/columns';
import { environment } from '../../../environments/environment';
import { BaseService } from './../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService extends BaseService<Column> {
  constructor(http: HttpClient) {
    super('columns', http);
  }

  getColumnsByBoardId(id: string) {
    return this.http.get<Column[]>(
      `${environment.apiUrl}/${id}/get-columns-by-board-id`
    );
  }
}
