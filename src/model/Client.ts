import Address from './Address';
import ClientComment from './ClientComment';
import Gender from './Gender';
import StatusType from './StatusType';

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
  fraudAlert: boolean;
  imageBase64?: string;
  address?: Address;
  comments: ClientComment[];
  status: StatusType;
}
