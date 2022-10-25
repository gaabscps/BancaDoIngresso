import Menu from './Menu';

export interface AuthUser {
  id: 'string';
  name: 'string';
  imageUrl: 'string';
  profile: 'string';
  roles: ['string'];
  menus: [Menu];
}
