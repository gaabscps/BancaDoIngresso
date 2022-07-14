import Pdv from './Pdv';

export default interface EventPdvMain {
  pdv: Pdv;
  allowMoney: boolean;
  allowAdvanceFee: boolean;
  allowDebit: boolean;
  allowCreditCard: boolean;
  allowBankSlip: boolean;
  allowPix: boolean;
  allowSellingWebsite: boolean;
  allowDiscount: boolean;
}
