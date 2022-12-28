import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import ProductSectionEvent from '@/model/SectionProductEvent';
import { ProductAndCombo, SectionProductsAndCombos } from '../screens';

export interface formPdvProductProps {
  formData: FormData;
  formErrors: FormErrors;
  sections: ProductSectionEvent[];
  productsAndCombos: ProductAndCombo[];
  tableContent: SectionProductsAndCombos[];
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}
