export interface ExpenseAttachments {
  id: string;
  description: string;
  fileURL: string;
}

export interface EventCloseExpense {
  id: string;
  description: string;
  value: number;
  attachments?: ExpenseAttachments[];
}
