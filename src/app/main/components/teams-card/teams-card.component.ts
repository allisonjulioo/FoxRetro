import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Teams } from 'src/app/models/teams/teams';

@Component({
  selector: 'teams-card',
  templateUrl: './teams-card.component.html',
  styleUrls: ['./teams-card.component.scss'],
})
export class TeamsCardComponent implements OnInit {
  public play = false;
  public baseUrl: string = location.origin;
  @Input() public cards: Teams[] = [];
  @Output() edit = new EventEmitter<Teams>();
  @Output() delete = new EventEmitter<Teams>();

  constructor(public device: DeviceDetectorService) {}

  ngOnInit(): void {}
  public onEdit(card: Teams) {
    this.edit.emit(card);
  }
  public onDelete(card: Teams) {
    this.delete.emit(card);
  }
}
