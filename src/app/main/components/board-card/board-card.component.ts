import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Boards } from 'src/app/models/boards/boards';

@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  public play = false;
  public baseUrl: string = location.origin;
  @Input() public cards: Boards[] = [];
  @Output() edit = new EventEmitter<Boards>();
  @Output() delete = new EventEmitter<Boards>();

  constructor(public device: DeviceDetectorService) { }
  public ngOnInit(): void {

  }
  public onEdit(card: Boards) {
    this.edit.emit(card);
  }
  onSwipe(evt) {
    console.log(evt);
  }
  public onDelete(card: Boards) {
    this.delete.emit(card);
  }

}
