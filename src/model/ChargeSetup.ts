import StatusType from './StatusType';

export default interface ChargeSetup {
  id: string;
  name: string;
  status: StatusType;
  url: string;
  token: string;
  frontToken: string;
  email: string;
  notificationURL: string;
  webhook: string;
}
