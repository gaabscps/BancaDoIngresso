import PosStatus from './PosStatus';

export default interface ChargeSetup {
  id: string;
  name: string;
  status: PosStatus;
  url: string;
  token: string;
  frontToken: string;
  email: string;
  notificationURL: string;
  webhook: string;
}
