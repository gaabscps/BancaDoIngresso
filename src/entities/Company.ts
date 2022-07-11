import Address from './Address';

export default interface Company {
  id: string;
  name: string;
  document: string;
  telephone: string;
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
