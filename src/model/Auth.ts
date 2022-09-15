import { AuthUser } from './AuthUser';

export interface Auth {
  user: AuthUser;
  token: 'string';
  refresh_token: 'string';
}
