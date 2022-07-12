import SubPdv from './SubPdv';

export default interface EventSubPdv {
  subPdv: SubPdv;
  allowMoney: boolean;
  allowAdvanceFee: boolean;
  allowDebit: boolean;
  allowCreditCard: boolean;
  allowBankSlip: boolean;
  allowPix: boolean;
  allowSellingWebsite: boolean;
  allowDiscount: boolean;
}
