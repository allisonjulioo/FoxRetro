import { User } from '../user/user';

export class Teams {
  id: number;
  title: string;
  description: string;
  logo: string;
  enabled: boolean;
  user_id: boolean;
  created_at: string;
  user: User;
}
