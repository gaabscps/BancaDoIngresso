import Address from './Address';
import Gender from './Gender';

export default interface Client {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  cellPhone: string;
  telephone: string;
  email: string;
  gender: Gender;
  birthDate: Date;
  motherName: string;
  imageBase64?: string;
  address?: Address;
}
