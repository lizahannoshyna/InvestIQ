import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';
import type { Transaction, TransactionType, MonthlySummary } from '../types/transaction';

interface TransactionState {
  transactions: Transaction[];
  summary: MonthlySummary[];
  activeType: TransactionType;
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  summary: [],
  activeType: 'expense',
  balance: 0,
  loading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk('transactions/fetchBalance', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data, error } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data?.balance ? Number(data.balance) : 0;
});

export const updateBalance = createAsyncThunk('transactions/updateBalance', async (newBalance: number) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Неавторизований користувач');

  const { error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, balance: newBalance });

  if (error) throw error;
  return newBalance;
});

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (type: TransactionType) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, categories(id, name, icon_name)')
      .eq('type', type)
      .order('date', { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (
    newTx: { date: string; description: string; category_id: string; amount: number; type: TransactionType },
    { dispatch }
  ) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([newTx])
      .select('*, categories(id, name, icon_name)')
      .single();

    if (error) throw error;

    dispatch(fetchMonthlySummary(newTx.type));
    return data as Transaction;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async ({ id, type }: { id: string; type: TransactionType }, { dispatch }) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) throw error;

    dispatch(fetchMonthlySummary(type));
    return id;
  }
);

export const fetchMonthlySummary = createAsyncThunk(
  'transactions/fetchMonthlySummary',
  async (type: TransactionType) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('date, amount')
      .eq('type', type);

    if (error) throw error;

    const monthsMap: Record<string, number> = {};
    const monthNames = [
      'СІЧЕНЬ', 'ЛЮТИЙ', 'БЕРЕЗЕНЬ', 'КВІТЕНЬ', 'ТРАВЕНЬ', 'ЧЕРВЕНЬ',
      'ЛИПЕНЬ', 'СЕРПЕНЬ', 'ВЕРЕСЕНЬ', 'ЖОВТЕНЬ', 'ЛИСТОПАД', 'ГРУДЕНЬ'
    ];

    data.forEach((tx) => {
      if (!tx.date) return;
      const dateObj = new Date(tx.date);
      const monthName = monthNames[dateObj.getMonth()];
      monthsMap[monthName] = (monthsMap[monthName] || 0) + Number(tx.amount);
    });

    return Object.entries(monthsMap).map(([month, total]) => ({ month, total }));
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setActiveType: (state, action: PayloadAction<TransactionType>) => {
      state.activeType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      })
      .addCase(fetchMonthlySummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export const { setActiveType } = transactionSlice.actions;
export default transactionSlice.reducer;