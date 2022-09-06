export default interface Address {
  id?: string;
  zipCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  complement?: string;
  number?: string;
  latitude?: number;
  longitude?: number;
}
