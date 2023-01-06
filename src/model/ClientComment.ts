import Client from './Client';
import User from './User';

export default interface ClientComment {
  id: string;
  client: Client;
  comment: string;
  commentDate: Date;
  bindingUser: User;
}
