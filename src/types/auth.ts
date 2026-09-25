import type { FormEvent } from "react";

export interface Profile {
  id: string;
  email: string;
  balance: number;
  currency: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: FormEvent) => void;
  handleGoogleLogin: () => void;
}