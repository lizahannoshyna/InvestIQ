import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';
import type { Profile } from '../types/auth';

interface AuthState {
  user: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const checkAuthSession = createAsyncThunk(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        return null;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      return {
        user: session.user,
        profile: (profile as Profile) || null,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Помилка перевірки сесії');
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Користувача не знайдено');

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return {
        user: data.user,
        profile: (profile as Profile) || null,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Помилка авторизації');
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Помилка входу через Google');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Помилка виходу з системи');
    }
  }
);

export const logout = logoutUser;

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Не вдалося завантажити профіль');
    }
  }
);

export const updateBalance = createAsyncThunk(
  'auth/updateBalance',
  async (
    { userId, newBalance }: { userId: string; newBalance: number },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data.balance as number;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Помилка оновлення балансу');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SupabaseUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.profile = action.payload.profile;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.profile = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Вхід через Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Вихід із системи
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBalance.pending, (state) => {
        state.error = null;
      })
      .addCase(updateBalance.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.profile) {
          state.profile.balance = action.payload;
        }
      })
      .addCase(updateBalance.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;