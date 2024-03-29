import Address from './Address';
import Contractor from './Contractor';
import EventCategory from './EventCategory';
import EventPdv from './EventPdv';
import EventPos from './EventPos';
import EventProduct from './EventProduct';
import EventProductCombo from './EventProductCombo';
import EventSectionGet from './EventSectionGet';
import EventStatus from './EventStatus';
import EventType from './EventType';
import TextSize from './TextSize';
import Tickets from './Tickets';
import Voucher from './Voucher';
import Section from './Section';

export default interface Event {
  id: string;
  fatherEvent?: Event;
  name: string;
  posName: string;
  establishmentName: string;
  eventType: EventType;
  eventPlace: string;
  address: Address;
  startDate: Date;
  endDate: Date;
  eventCategory: EventCategory;
  contractor: Contractor;
  censure: number;
  facebookUrl: string;
  instagramUrl: string;
  imageBase64: string;
  imagePosBase64: string;
  publishWebsite: boolean;
  textSize: TextSize;
  ticketPhrase: string;
  websiteDescription: string;
  eventStatus: EventStatus;
  vouchers?: Voucher[];
  tickets?: Tickets[];
  products?: EventProduct[];
  combos?: EventProductCombo[];
  eventSection?: Section[];
  sectionproductsAndCombos?: EventSectionGet[];
  poss?: EventPos[];
  pdvs?: EventPdv[];
  childs?: [
    {
      name: string;
    },
  ];
}
