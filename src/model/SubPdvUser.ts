import Pdv from './Pdv';

export default interface SubPdvUser {
  subPdvId: string;
  pdv: Pdv;
  users: string[];
}
