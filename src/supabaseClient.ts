import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Відсутні змінні оточення VITE_SUPABASE_URL або VITE_SUPABASE_ANON_KEY у файлі .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);