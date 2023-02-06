import EventPhaseCompletionPdv from './EventPhaseCompletionPdv ';
import EventPhaseCompletionSectionProduct from './EventPhaseCompletionSectionProduct ';
import EventPhaseCompletionTicket from './EventPhaseCompletionTicket ';

export default interface EventPhaseCompletion {
  generalInformation: boolean;
  ticket: EventPhaseCompletionTicket;
  sectionProduct: EventPhaseCompletionSectionProduct;
  pdv: EventPhaseCompletionPdv;
  confirmation: boolean;
}
