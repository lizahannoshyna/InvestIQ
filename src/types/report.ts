export interface ReportItem {
  label: string;
  amount: number;
}

export interface CategoryGridItem {
  id: string;
  name: string;
  amount: number;
  icon: string;
}

export interface ReportsState {
  selectedMonth: number;
  selectedYear: number;
  totalExpenses: number;
  totalIncome: number;
  expenseCategories: CategoryGridItem[];
  incomeCategories: CategoryGridItem[];
  expenseChartData: ReportItem[];
  incomeChartData: ReportItem[];
  loading: boolean;
  error: string | null;
}