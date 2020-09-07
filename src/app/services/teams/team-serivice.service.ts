import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teams } from 'src/app/models/teams/teams';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class TeamServiceService extends BaseService<Teams> {
  constructor(http: HttpClient) {
    super('teams', http);
  }
}
