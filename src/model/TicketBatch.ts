export default interface TicketBatch {
  id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  commission: number;
  amount: number;
  unitValue: number;
  totalValue: number;
  imageUrl: string;
}
