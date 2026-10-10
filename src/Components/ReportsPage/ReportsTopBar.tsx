import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { setPeriod } from "../../store/reportsSlice";

const monthNames = [
  "СІЧЕНЬ", "ЛЮТИЙ", "БЕРЕЗЕНЬ", "КВІТЕНЬ", "ТРАВЕНЬ", "ЧЕРВЕНЬ",
  "ЛИПЕНЬ", "СЕРПЕНЬ", "ВЕРЕСЕНЬ", "ЖОВТЕНЬ", "ЛИСТОПАД", "ГРУДЕНЬ"
];

export const ReportsTopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedMonth, selectedYear } = useAppSelector((state) => state.reports);

  const handlePrevMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }
    dispatch(setPeriod({ month: newMonth, year: newYear }));
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    dispatch(setPeriod({ month: newMonth, year: newYear }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#181236] border border-[#251d4a] rounded-2xl p-4 gap-4 shadow-lg">
      <Link
        to="/InvestIQ/expenses"
        className="flex items-center gap-2 text-sm text-[#cdf27e] bg-[#251d4a] px-4 py-2 rounded-xl hover:bg-[#322863] transition-colors"
      >
        ← Повернутись на головну
      </Link>

      <div className="flex items-center gap-4 bg-[#100b26] px-4 py-2.5 rounded-xl border border-[#251d4a]">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">
          Поточний період
        </span>
        <div className="flex items-center gap-3">
          <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white cursor-pointer">❮</button>
          <span className="font-bold text-white text-sm">
            {monthNames[selectedMonth - 1]} {selectedYear}
          </span>
          <button onClick={handleNextMonth} className="text-gray-400 hover:text-white cursor-pointer">❯</button>
        </div>
      </div>
    </div>
  );
};