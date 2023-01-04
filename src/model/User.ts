import Profile from './Profile';
import StatusType from './StatusType';
import UserType from './UserType';

export default interface User {
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  imageBase64: string;
  imageURL?: string;
  imageName: string;
  password: string;
  userType: UserType;
  status: StatusType;
  profiles?: Profile[];
}
