import Address from './Address';
import Contractor from './Contractor';
import Event from './Event';
import EventCategory from './EventCategory';
import EventType from './EventType';
import TextSize from './TextSize';

export default interface EventGeneralInformation {
  id: string;
  fatherEvent?: string;
  name: string;
  posName: string;
  establishmentName: string;
  eventType: EventType;
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
}

export const parseGeneralInformation = (event: Event): EventGeneralInformation => {
  let fatherEvent: string | undefined;
  if (event.fatherEvent && event.fatherEvent.id) {
    fatherEvent = event.fatherEvent.id;
  }
  const egi: EventGeneralInformation = {
    id: event.id,
    fatherEvent,
    name: event.name,
    posName: event.posName,
    establishmentName: event.establishmentName,
    eventType: event.eventType,
    address: event.address,
    startDate: event.startDate,
    endDate: event.endDate,
    eventCategory: event.eventCategory,
    contractor: event.contractor,
    censure: event.censure,
    facebookUrl: event.facebookUrl,
    instagramUrl: event.instagramUrl,
    imageBase64: event.imageBase64,
    imagePosBase64: event.imagePosBase64,
    publishWebsite: event.publishWebsite,
    textSize: event.textSize,
    ticketPhrase: event.ticketPhrase,
    websiteDescription: event.websiteDescription,
  };
  return egi;
};
