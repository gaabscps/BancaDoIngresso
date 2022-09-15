import Event from './Event';

export default interface Home {
  pendingReleaseEvents: number;
  canceledEvents: number;
  registeredPdvs: number;
  chargeback: number;
  lastEvents: Event[];
}
