import Address from './Address';

export default interface PdvSave {
  id: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  address: Address;
  users: string[];
}
