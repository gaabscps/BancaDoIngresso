import Address from './Address';
import Pdv from './Pdv';

export default interface SubPdvSave {
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
  pdv: Pdv;
  address: Address;
}
