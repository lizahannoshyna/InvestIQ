import React, { type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { LoginFormProps } from "../../types/auth";
import { useState } from "react";
export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  handleSubmit,
  handleGoogleLogin,
}) => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isEmailEmpty = !email.trim();
    const isPasswordEmpty = !password.trim();

    setEmailError(isEmailEmpty);
    setPasswordError(isPasswordEmpty);

    if (isEmailEmpty || isPasswordEmpty) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="animate__animated animate__fadeInRight animate__fast w-full max-w-md bg-[#160d29]/80 backdrop-blur-xl border border-[#2d1b4e] hover:border-[#3d2468] rounded-3xl p-8 shadow-2xl transition-all duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1.5">
          Sign in with Google or email account
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Welcome back. Enter your credentials to access your financial dashboard.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full py-3 px-4 rounded-full bg-[#1e1338] hover:bg-[#27194a] border border-[#342059] hover:border-[#4c2e80] text-white font-medium text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
          <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.6-1.5-1-3.2-1-5z" />
          <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-[#2d1b4e] w-full" />
        <span className="bg-[#160d29] px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase absolute">
          OR SIGN IN WITH EMAIL
        </span>
      </div>

      {error && (
        <div className="animate__animated animate__shakeX p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4">

        <div>
          <label htmlFor="email" className="block text-[10px] font-bold text-slate-300 tracking-wider uppercase mb-1.5">
            EMAIL ADDRESS
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 group-focus-within:text-[#6f4bf2] transition-colors text-sm">
              @
            </span>
            <input
              id="email"
              type="email"
              placeholder="alex@investiq.app"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
              }}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f0921] text-white placeholder-slate-600 text-sm focus:outline-none transition-all duration-300 ${emailError
                ? "border border-red-500/80 focus:ring-2 focus:ring-red-500/20"
                : "border border-[#2e1c50] focus:border-[#6f4bf2] focus:ring-2 focus:ring-[#6f4bf2]/20 focus:shadow-[0_0_15px_rgba(111,75,242,0.25)]"
                }`}
            />
          </div>

          {emailError && (
            <p className="text-red-400 text-xs mt-1.5 animate__animated animate__fadeIn">
              це обов’язкове поле
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-[10px] font-bold text-slate-300 tracking-wider uppercase">
              PASSWORD
            </label>
            <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 group-focus-within:text-[#6f4bf2] transition-colors text-xs">
              🔒
            </span>
            <input
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(false);
              }}
              className={`w-full pl-10 pr-10 py-3 rounded-xl bg-[#0f0921] text-white placeholder-slate-600 text-sm focus:outline-none transition-all duration-300 ${passwordError
                ? "border border-red-500/80 focus:ring-2 focus:ring-red-500/20"
                : "border border-[#2e1c50] focus:border-[#6f4bf2] focus:ring-2 focus:ring-[#6f4bf2]/20 focus:shadow-[0_0_15px_rgba(111,75,242,0.25)]"
                }`}
            />
          </div>

          {passwordError && (
            <p className="text-red-400 text-xs mt-1.5 animate__animated animate__fadeIn">
              це обов’язкове поле
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-full bg-[#cdf27e] hover:bg-[#d8f593] text-[#0d071e] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(205,242,126,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0d071e] border-t-transparent rounded-full animate-spin" />
                Вхід...
              </span>
            ) : (
              "Log In →"
            )}
          </button>

          <Link
            to="/register"
            className="w-full py-3 px-4 rounded-full bg-[#1e1338] hover:bg-[#27194a] border border-[#342059] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] text-center block"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
};
