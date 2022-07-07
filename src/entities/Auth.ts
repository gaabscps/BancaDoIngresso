import AuthUser from './AuthUser';

export default interface Auth {
  user: AuthUser;
  token: 'string';
  refresh_token: 'string';
}
