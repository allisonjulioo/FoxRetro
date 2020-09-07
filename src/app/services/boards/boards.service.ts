import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Boards } from 'src/app/models/boards/boards';
import { BaseService } from './../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsService extends BaseService<Boards> {
  constructor(http: HttpClient) {
    super('boards', http);
  }
}
