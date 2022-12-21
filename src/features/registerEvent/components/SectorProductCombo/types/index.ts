import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import EventProduct from '@/model/EventProduct';
import ProductSubgroup from '@/model/ProductSubgroup';
import SectorProductCombo from '@/model/SectorProductCombo';
import SectorProductComboProduct from '@/model/SectorProductComboProduct';

export interface formComboProps {
  onChangeFormInputCombo: OnChangeFormInput;
  formDataCombo: FormData;
  formErrorsCombo: FormErrors;
  onClearSelectSubGroup: (ref: any) => void;
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

export interface comboStatesProps {
  state: string;
  listProductSubGroup: ProductSubgroup[];
  listProductGroup: EventGroupSubgroup[];
  product: SectorProductComboProduct[];
  productList: SectorProductComboProduct[];
  combo: SectorProductCombo[];
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
  getProductSubGroupList: (id: string) => Promise<void>;
  onChangeAllowOnlineSwitch: (comboSelected: any) => Promise<void>;
  onChangeComboSwitch: (comboSelected: any) => Promise<void>;
}
