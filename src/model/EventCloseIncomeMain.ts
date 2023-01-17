import { EventCloseIncome } from './EventCloseIncome';

export default interface EventCloseIncomeMain {
  amount: number;
  totalValue: number;
  incomes: EventCloseIncome[];
}
