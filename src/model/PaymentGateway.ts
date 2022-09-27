import ChargeSetup from './ChargeSetup';
import StatusType from './StatusType';

export default interface PaymentGateway {
  id: string;
  name: string;
  charge: ChargeSetup;
  status: StatusType;
}
