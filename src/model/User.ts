import Profile from './Profile';
import UserType from './UserType';

export default interface User {
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  imageBase64: string;
  password: string;
  userType: UserType;
  profiles?: Profile[];
}
