import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import DiscountCoupon from '@/model/DiscountCoupon';
import { ShouldShowModal } from '../screens/ui';

export interface formProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
  onChangeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: { [key: string]: string };
}

export interface formConfigProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalSectorProductProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  product?: any;
}

export interface modalConfigTicketMainSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  handleOnTougleModal: () => void;
  onShouldShowModal: (props: onShouldShowModalSectorProductProps) => void;
  shouldShowModal: ShouldShowModal;
  onShowModalDelete: any;
}

export interface productActionsProps {
  onSave: () => Promise<void>;
  onSaveConfig: (productSelected: any) => Promise<void>;
  onGet: (productSelected: any) => Promise<void>;
  onFirstTab: () => void;
  onReturnTab: () => void;
  onNextTab: () => Promise<void>;
  onCancelEdit: () => void;
  onChangeAllowOnline: (productSelected: any) => Promise<void>;
  onProductByCategory: (groupId: string, subgroupId: string) => Promise<void>;
}

export interface productStatesProps {
  product: any | undefined;
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  productList: any[];
  setProductList: React.Dispatch<React.SetStateAction<any[]>>;
  groupList: any[];
  optionProduct: any[];
}

export interface FormDiscountCouponProps {
  handleAddDiscountCoupon: () => void;
  handleChangeDiscountCoupon: (name: string, index: number, value: string) => void;
  handleRemoveDiscountCoupon: (index: number) => void;
  discountCoupon: DiscountCoupon[];
}
