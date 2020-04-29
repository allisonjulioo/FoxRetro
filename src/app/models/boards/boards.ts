import { Column } from '../columns/columns';

export class Boards {
  id: number;
  title: string;
  created_at: string;
  columns: Array<Column>;
  user_id: number;
  user_votes: number;
  in_voting: boolean;
  limit_votes: number;
}
