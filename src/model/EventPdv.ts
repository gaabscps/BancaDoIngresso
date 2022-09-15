import EventSection from './EventSection';
import EventSubPdv from './EventSubPdv';
import Pdv from './Pdv';
import Ticket from './Ticket';

export default interface EventPdv {
  pdv: Pdv;
  allowMoney: boolean;
  allowAdvanceFee: boolean;
  allowDebit: boolean;
  allowCreditCard: boolean;
  allowBankSlip: boolean;
  allowPix: boolean;
  allowSellingWebsite: boolean;
  allowDiscount: boolean;
  tickets?: Ticket[];
  sections?: EventSection[];
  subPdvs?: EventSubPdv[];
  link?: string;
}
