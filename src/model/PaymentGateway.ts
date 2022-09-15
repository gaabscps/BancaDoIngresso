import ChargeSetup from './ChargeSetup';
import PixSetup from './PixSetup';

export default interface PaymentGateway {
  id: string;
  name: string;
  charge: ChargeSetup;
  pix: PixSetup;
  actived: boolean;
}
