import Address from './Address';
import User from './User';

export default interface Pdv {
  id?: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64: string;
  mapBase64: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  address: Address;
  amountSubPdvs?: number;
  batchClosed: boolean;
  askPasswordInactivity: boolean;
  inactivityTimeout: string;
  users: User[];
}
