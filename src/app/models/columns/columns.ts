import { Cards } from '../cards/cards';

export class Column {
  id?: number;
  title?: string;
  color?: string;
  board_id: string;
  cards?: Cards[];
}
