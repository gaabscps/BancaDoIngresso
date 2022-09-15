import Address from './Address';
import EventStatus from './EventStatus';
import EventType from './EventType';
import TextSize from './TextSize';

export default interface EventFind {
  id: string;
  fatherEvent: string;
  name: string;
  posName: string;
  establishmentName: string;
  eventType: EventType;
  address: Address;
  startDateBegin: Date;
  startDateEnd: Date;
  endDateBegin: Date;
  endDateEnd: Date;
  eventCategoryId: string;
  contractorId: string;
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
}
