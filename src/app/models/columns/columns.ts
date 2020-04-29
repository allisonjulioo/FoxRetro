import { Cards } from '../cards/cards';

export class Column {
  id: number;
  title: string;
  color: string;
  user_id: number;
  board_id: number;
  cards: Array<Cards>
}
