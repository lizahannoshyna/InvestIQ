import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';
import type { ReportItem, CategoryGridItem, ReportsState } from '../types/report';

const initialState: ReportsState = {
  selectedMonth: new Date().getMonth() + 1, 
  selectedYear: new Date().getFullYear(), 
  totalExpenses: 0,
  totalIncome: 0,
  expenseCategories: [],
  incomeCategories: [],
  expenseChartData: [],
  incomeChartData: [],
  loading: false,
  error: null,
};

export const fetchReportsData = createAsyncThunk(
  'reports/fetchReportsData',
  async ({ month, year }: { month: number; year: number }, { rejectWithValue }) => {
    try {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01 00:00:00`;
      const lastDay = new Date(year, month, 0).getDate();
      const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay} 23:59:59`;

      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          amount,
          type,
          date,
          categories ( id, name )
        `)
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;
      if (!data) {
        return {
          totalExpenses: 0,
          totalIncome: 0,
          expenseCategories: [],
          incomeCategories: [],
          expenseChartData: [],
          incomeChartData: [],
        };
      }

      let expensesSum = 0;
      let incomeSum = 0;
      const expenseMap: Record<string, { amount: number; name: string }> = {};
      const incomeMap: Record<string, { amount: number; name: string }> = {};

      data.forEach((curr: any) => {
        const amount = Number(curr.amount);
        const catName = curr.categories?.name || 'Інше';
        const catId = curr.categories?.id || 'other';

        if (curr.type === 'expense') {
          expensesSum += amount;
          if (!expenseMap[catId]) expenseMap[catId] = { name: catName, amount: 0 };
          expenseMap[catId].amount += amount;
        } else if (curr.type === 'income') {
          incomeSum += amount;
          if (!incomeMap[catId]) incomeMap[catId] = { name: catName, amount: 0 };
          incomeMap[catId].amount += amount;
        }
      });

      const expenseCategories: CategoryGridItem[] = Object.keys(expenseMap).map((key) => ({
        id: key,
        name: expenseMap[key].name,
        amount: expenseMap[key].amount,
        icon: '📉',
      }));

      const incomeCategories: CategoryGridItem[] = Object.keys(incomeMap).map((key) => ({
        id: key,
        name: incomeMap[key].name,
        amount: incomeMap[key].amount,
        icon: '📈',
      }));

      const expenseChartData: ReportItem[] = Object.values(expenseMap).map((item) => ({
        label: item.name,
        amount: item.amount,
      }));

      const incomeChartData: ReportItem[] = Object.values(incomeMap).map((item) => ({
        label: item.name,
        amount: item.amount,
      }));

      return {
        totalExpenses: expensesSum,
        totalIncome: incomeSum,
        expenseCategories,
        incomeCategories,
        expenseChartData,
        incomeChartData,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<{ month: number; year: number }>) => {
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsData.pending, (state) => {
        if (state.expenseCategories.length === 0 && state.incomeCategories.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchReportsData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalExpenses = action.payload.totalExpenses;
        state.totalIncome = action.payload.totalIncome;
        state.expenseCategories = action.payload.expenseCategories;
        state.incomeCategories = action.payload.incomeCategories;
        state.expenseChartData = action.payload.expenseChartData;
        state.incomeChartData = action.payload.incomeChartData;
      })
      .addCase(fetchReportsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPeriod } = reportsSlice.actions;
export default reportsSlice.reducer;