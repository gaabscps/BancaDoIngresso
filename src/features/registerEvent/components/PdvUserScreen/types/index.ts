import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import User from '@/model/User';

export interface formPdvUserProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface appendPdvUserProps {
  listUsers: User[];
  usersSelected: User[];
  handleRemoveUser(userId: string): void;
  handleAddUser(userId: string): void;
  handleGetUsers(): void;
}
