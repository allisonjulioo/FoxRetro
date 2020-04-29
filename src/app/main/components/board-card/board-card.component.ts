import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  public play: Boolean = false;
  public baseUrl: string = location.origin;
  @Input() public cards: Array<Object> = [];
  @Output() edit = new EventEmitter<Object>();
  @Output() delete = new EventEmitter<Object>();

  constructor(public device: DeviceDetectorService) { }
  public ngOnInit(): void {

  }
  public onEdit(card: Object) {
    this.edit.emit(card);
  };
  onSwipe(evt) {
    console.log(evt)
  }
  public onDelete(card: Object) {
    this.delete.emit(card);
  }

}
