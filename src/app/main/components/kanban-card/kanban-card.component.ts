import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { update } from '../../../store/actions/updateColumn.actions';
import { CardsService } from './../../../services/cards/cards.service';
import { Cards } from 'src/app/models/cards/cards';

@Component({
  selector: 'kanban-cards',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent implements OnInit {
  @Input() cards: Array<Object>;
  @Input() color: String;
  public deleting: boolean = false;

  constructor(
    private store: Store<{ update: true }>,
    private cardService: CardsService
  ) { }

  ngOnInit(): void {
  }

  addLike(card: Cards) {
    this.cardService.update(card)
      .subscribe(res => {
        if (res) {
          this.store.dispatch(update())
        }
      })
  }
  public editCard(card: Cards, evt: string) {
    if (card.content !== evt) {
      card.content = evt;
      this.cardService.update(card)
        .subscribe(res => {
          if (res) {
            this.store.dispatch(update())
          }
        })
    }
  }
  public deleteCard(card: Cards) {
    card.deleting = true;
    this.cardService.delete(card)
      .subscribe(res => {
        if (res) {
          this.store.dispatch(update())
          setTimeout(() => card.deleting = false, 1000)
        }
      })
  }
}
