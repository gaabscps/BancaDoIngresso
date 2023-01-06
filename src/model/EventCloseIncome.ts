export default interface EventCloseIncome {
  amount: number;
  description: string;
  value: number;
  isIncome: boolean;
  attachments?: number;
  groupId?: string;
  sectionId?: string;
}
