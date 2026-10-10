import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store';
import { fetchBalance, updateBalance } from '../../store/transactionSlice';
import { logout } from '../../store/authSlice';

export const TransactionHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector((state: RootState) => state.transactions.balance);
  const user = useSelector((state: RootState) => state.auth.user);
  const [inputBalance, setInputBalance] = useState('');

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    setInputBalance(balance ? balance.toFixed(2) : '0.00');
  }, [balance]);

  const handleConfirm = () => {
    const numericVal = parseFloat(inputBalance);
    if (!isNaN(numericVal)) {
      dispatch(updateBalance(numericVal));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full bg-[#181236] text-white px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-3.5 border-b border-purple-900/30 rounded-2xl">
      
      <div className="w-full lg:w-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6a3df4] flex items-center justify-center shadow-lg shadow-purple-900/40 shrink-0">
            <svg className="w-4 h-4 text-[#d2fc52]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">InvestIQ</span>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/InvestIQ/reports"
            className="text-xs text-purple-300 hover:text-[#d2fc52] bg-[#120c24] px-3 py-1.5 rounded-xl border border-purple-900/40"
          >
            Reports
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-purple-300/70 hover:text-white p-1.5 rounded-xl bg-[#120c24] border border-purple-900/40"
            title="Вийти"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
          <Link
            to="/InvestIQ/reports"
            className="text-purple-300/80 hover:text-[#d2fc52] transition-colors"
          >
            Reports
          </Link>
        </nav>
      </div>

      <div className="w-full lg:w-auto bg-[#120c24] border border-purple-900/50 rounded-xl lg:rounded-full px-4 py-1.5 flex items-center justify-between gap-3 shadow-inner">
        <span className="text-[10px] font-semibold tracking-wider text-purple-300/70 uppercase">
          BALANCE:
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            step="0.01"
            value={inputBalance}
            onChange={(e) => setInputBalance(e.target.value)}
            className="w-24 bg-transparent text-[#d2fc52] font-bold text-sm outline-none text-right rounded px-1"
          />
          <span className="text-[#d2fc52] font-bold text-xs">UAH</span>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-[#d2fc52] hover:bg-[#bce83e] text-slate-900 font-semibold text-xs px-3 py-1 rounded-lg lg:rounded-full transition-all active:scale-95 cursor-pointer"
        >
          Confirm
        </button>
      </div>

      {/* Права частина для ПК: Профіль та вихід */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="h-5 w-[1px] bg-purple-900/40" />
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#231a47] flex items-center justify-center text-purple-200 font-bold text-xs">
            {user?.email ? user.email[0].toUpperCase() : 'U'}
          </div>
          <span className="text-xs font-medium text-purple-100 truncate max-w-[150px]">
            {user?.email || 'User'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-purple-300/70 hover:text-white transition-colors cursor-pointer p-1"
          title="Вийти"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

    </header>
  );
};

export default TransactionHeader;