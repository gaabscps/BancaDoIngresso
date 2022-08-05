import Address from './Address';

export default interface Company {
  id: any;
  name: string;
  document: string;
  telephone: string;
  type: string;
  email: string;
  imageUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  urlApi: string;
  urlAdmin: string;
  urlSite: string;
  address: Address;
}
