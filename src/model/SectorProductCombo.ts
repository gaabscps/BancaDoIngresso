import SectorProductComboProduct from './SectorProductComboProduct';
import StatusType from './StatusType';

export default interface SectorProductCombo {
  id?: string;
  group: {
    id?: string;
    name: string;
    imageBase64?: string;
  };
  subgroup: {
    id?: string;
    name: string;
    categoryGroup?: {
      id: string;
      name: string;
      imageBase64: string;
    };
    imageBase64?: string;
  };
  name: string;
  amount: number;
  totalValue: number;
  imageBase64: string;
  products: SectorProductComboProduct[];
  status: StatusType;
  allowSellingWebsite: boolean;
}
