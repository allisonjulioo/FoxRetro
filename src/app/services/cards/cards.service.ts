import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cards } from 'src/app/models/cards/cards';
import { BaseService } from './../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService extends BaseService<Cards> {
  constructor(public http: HttpClient) {
    super('cards', http);
  }
}
