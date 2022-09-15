import Address from './Address';

export default interface ClientUpdate {
  id: string;
  telephone?: string;
  imageBase64?: string;
  address?: Address;
}
