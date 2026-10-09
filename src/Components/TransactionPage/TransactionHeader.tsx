import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <header className="w-full bg-[#181236] text-white px-6 py-3.5 flex items-center justify-between border-b border-purple-900/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#6a3df4] flex items-center justify-center shadow-lg shadow-purple-900/40">
          <svg className="w-5 h-5 text-[#d2fc52]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">InvestIQ</span>
      </div>

      <div className="bg-[#120c24] border border-purple-900/50 rounded-full px-5 py-1.5 flex items-center gap-3 shadow-[0_0_20px_rgba(106,61,244,0.15)]">
        <span className="text-xs font-semibold tracking-wider text-purple-300/70 uppercase">
          BALANCE:
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            step="0.01"
            value={inputBalance}
            onChange={(e) => setInputBalance(e.target.value)}
            className="w-28 bg-transparent text-[#d2fc52] font-bold text-sm outline-none text-right focus:ring-1 focus:ring-purple-500/40 rounded px-1"
          />
          <span className="text-[#d2fc52] font-bold text-sm">UAH</span>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-[#d2fc52] hover:bg-[#bce83e] text-slate-900 font-semibold text-xs px-4 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(210,252,82,0.3)] ml-1"
        >
          Confirm
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-5 w-[1px] bg-purple-900/40" />
        <div className="w-9 h-9 rounded-full bg-[#231a47] flex items-center justify-center text-purple-200 font-bold text-sm">
          {user?.email ? user.email[0].toUpperCase() : 'U'}
        </div>
        <span className="text-sm font-medium text-purple-100 hidden sm:inline">
          {user?.email || 'User'}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="text-purple-300/70 hover:text-white transition-colors cursor-pointer"
          title="Вийти"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TransactionHeader;