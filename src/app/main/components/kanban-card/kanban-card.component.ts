import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cards } from 'src/app/models/cards/cards';
import { update } from '../../../store/actions/updateColumn.actions';
import { CardsService } from './../../../services/cards/cards.service';

@Component({
  selector: 'kanban-cards',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss'],
})
export class KanbanCardComponent implements OnInit {
  @Input() cards: Cards[];
  @Input() color: string;
  public deleting: boolean;

  constructor(
    private store: Store<{ update: true }>,
    private cardService: CardsService
  ) {}

  ngOnInit(): void {}

  addLike(card: Cards) {
    this.cardService.update(card).subscribe((res) => {
      if (res) {
        this.store.dispatch(update());
      }
    });
  }
  public editCard(card: Cards, evt: string) {
    if (card.content !== evt) {
      card.content = evt;
      this.cardService.update(card).subscribe((res) => {
        if (res) {
          this.store.dispatch(update());
        }
      });
    }
  }
  public deleteCard(card: Cards) {
    console.log(card);
    card.deleting = true;
    this.cardService.delete(card.id).subscribe((data) => {
      if (data) {
        this.store.dispatch(update());
        setTimeout(() => (card.deleting = false), 1000);
      }
    });
  }
}
