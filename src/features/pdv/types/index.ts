import Page from '@/model/Page';
import Pdv from '@/model/Pdv';
import User from '@/model/User';

export type PdvResponse = Page<Pdv, Pdv>;

export type PdvRequestParams = Pick<
  Page<Pdv, Pdv>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}

export type ContractorControllerUser = {
  listUsers: User[];
  usersSelected: User[];
  handleAddUser(userId: string): void;
  handleRemoveUser(index: number): void;
};
