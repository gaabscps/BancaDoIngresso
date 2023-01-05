import User from './User';

export default interface OrderItemComment {
  id: string;
  comment: string;
  commentDate: Date;
  bindingUser: User;
}
