import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import EventProduct from '@/model/EventProduct';
import ProductSubgroup from '@/model/ProductSubgroup';
import SectorProductCombo from '@/model/SectorProductCombo';
import SectorProductComboProduct from '@/model/SectorProductComboProduct';
import { NameFiles } from '../screens';

export interface formComboProps {
  onChangeFormInputCombo: OnChangeFormInput;
  onClearSelectSubGroup: (ref: any) => void;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  formDataCombo: FormData;
  formErrorsCombo: FormErrors;
  nameFiles: NameFiles | undefined;
}

export interface formAppendProductsProps {
  onChangeProduct(inputName: string, index: number, value: string | undefined): void;
  addProduct(index: string): void;
  removeProduct(index: number): void;
}

export interface formComboConfigProps {
  onChangeFormInputComboConfig: OnChangeFormInput;
  formDataComboConfig: FormData;
  formErrorsComboConfig: FormErrors;
}

export interface formDiscountCouponProps {
  onChangeFormInputDiscount: OnChangeFormInput;
  formDataDiscount: FormData;
  formErrorsDiscount: FormErrors;
}

export interface comboStatesProps {
  state: string;
  listProductSubGroup: ProductSubgroup[];
  listProductGroup: EventGroupSubgroup[];
  listProduct: EventProduct[];
  product: SectorProductComboProduct[];
  comboState: any;
  comboConfig: any;
  comboList: SectorProductCombo[];
  productGet: EventProduct[];
}

export interface comboActionsProps {
  onFirstTab: () => void;
  onReturnTab: () => void;
  onNextTab: () => Promise<void>;
}

export interface comboRequestProps {
  saveCombo: () => Promise<void>;
  saveComboConfig: (comboSelected: any) => Promise<void>;
  saveDiscountCoupon: (comboSelected: any) => Promise<void>;
  onChangeAllowOnlineSwitch: (comboSelected: any) => Promise<void>;
  onChangeComboSwitch: (comboSelected: any) => Promise<void>;
  getComboSelected: (comboSelected: any) => Promise<void>;
  onCancelEdit: () => void;
  getProductList: (group: string, subGroup: string) => Promise<void>;
  getComboConfig: (comboSelected: any) => Promise<void>;
  getDiscount: (comboSelected: any) => Promise<void>;
  removeDiscountCoupon: (comboSelected: any, discountCouponSelected: any) => Promise<void>;
}
