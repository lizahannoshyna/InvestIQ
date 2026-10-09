import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchCategories } from '../../store/categoriesSlice';
import { addTransaction } from '../../store/transactionSlice';

export const TransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeType = useSelector((state: RootState) => state.transactions.activeType);
  const categories = useSelector((state: RootState) => state.categories.items);

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [date, setDate] = useState(getCurrentDateTime());
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(fetchCategories(activeType));
    setCategoryId('');
  }, [dispatch, activeType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !categoryId || !amount || !date) return;

    dispatch(
      addTransaction({
        date,
        description,
        category_id: categoryId,
        amount: parseFloat(amount),
        type: activeType,
      })
    );

    handleClear();
  };

  const handleClear = () => {
    setDate(getCurrentDateTime());
    setDescription('');
    setCategoryId('');
    setAmount('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e1738] border border-[#3b3162] rounded-[28px] p-5 md:p-6 flex flex-col lg:flex-row items-stretch lg:items-end gap-4 shadow-xl"
    >
      <div className="flex-1 min-w-[180px]">
        <label className="block text-[11px] font-semibold text-purple-300/70 mb-2 tracking-wider uppercase">
          DATE & TIME
        </label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-white text-gray-900 text-sm font-medium rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-purple-400 transition cursor-pointer"
        />
      </div>

      <div className="flex-[2] min-w-[200px]">
        <label className="block text-[11px] font-semibold text-purple-300/70 mb-2 tracking-wider uppercase">
          DESCRIPTION
        </label>
        <input
          type="text"
          placeholder="Опис товару"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white text-gray-900 text-sm rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-purple-400 transition placeholder-gray-400"
        />
      </div>

      <div className="flex-1 min-w-[160px]">
        <label className="block text-[11px] font-semibold text-purple-300/70 mb-2 tracking-wider uppercase">
          CATEGORY
        </label>
        <div className="relative">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-[#130d28] text-purple-200 text-sm rounded-full px-4 py-2.5 outline-none border border-purple-900/50 appearance-none cursor-pointer focus:border-purple-500 transition pr-9"
          >
            <option value="" className="bg-[#130d28] text-gray-400">
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#130d28] text-white">
                {cat.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-300">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-[140px]">
        <label className="block text-[11px] font-semibold text-purple-300/70 mb-2 tracking-wider uppercase">
          AMOUNT
        </label>
        <input
          type="number"
          step="0.01"
          placeholder="850.00 UAH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white text-gray-900 text-sm font-semibold rounded-full px-4 py-2.5 outline-none border border-transparent focus:border-purple-400 transition placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-3 pt-2 lg:pt-0">
        <button
          type="submit"
          className="bg-[#d2fc52] hover:bg-[#bce83e] text-slate-900 font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(210,252,82,0.35)] active:scale-95 cursor-pointer whitespace-nowrap"
        >
          + Add
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-[#140e28] hover:bg-[#1f173b] text-slate-300 font-medium text-sm px-5 py-2.5 rounded-full border border-purple-900/50 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;