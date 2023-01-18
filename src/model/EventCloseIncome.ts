export interface IncomeAttachments {
  id: string;
  description: string;
  fileURL: string;
}

export interface EventCloseIncome {
  amount: number;
  description: string;
  value: number;
  isIncome: boolean;
  attachments?: IncomeAttachments[];
  groupId?: string;
  sectionId?: string;
}
