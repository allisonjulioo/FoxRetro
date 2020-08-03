import { Column } from '../columns/columns';
import { Teams } from '../teams/teams';

export class Boards {
  id: number;
  title: string;
  created_at: string;
  columns: Column[];
  user_id: number;
  user_votes: number;
  in_voting: boolean;
  limit_votes: number;
  team: Teams;
}
