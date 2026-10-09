export type TransactionType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon_name?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  date: string;
  description: string;
  category_id: string;
  amount: number;
  created_at?: string;
  categories?: Category; 
}

export interface MonthlySummary {
  month: string;
  total: number;
}