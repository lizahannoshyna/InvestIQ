import React from "react";

interface Props {
  totalExpenses: number;
  totalIncome: number;
}

export const TotalsOverview: React.FC<Props> = ({ totalExpenses, totalIncome }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div className="bg-[#181236] border border-[#251d4a] rounded-2xl p-5 flex items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-purple-300/70 uppercase">
            ВИТРАТИ ЗА ПЕРІОД
          </span>
          <span className="text-xl font-bold text-red-400 mt-1">
            - {totalExpenses.toLocaleString("uk-UA", { minimumFractionDigits: 2 })} <span className="text-sm">UAH</span>
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#100b26] flex items-center justify-center text-red-400 text-xl border border-[#251d4a]">
          📉
        </div>
      </div>

      <div className="bg-[#181236] border border-[#251d4a] rounded-2xl p-5 flex items-center justify-between shadow-lg">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-purple-300/70 uppercase">
            ДОХОДИ ЗА ПЕРІОД
          </span>
          <span className="text-xl font-bold text-[#cdf27e] mt-1">
            + {totalIncome.toLocaleString("uk-UA", { minimumFractionDigits: 2 })} <span className="text-sm">UAH</span>
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#100b26] flex items-center justify-center text-[#cdf27e] text-xl border border-[#251d4a]">
          📈
        </div>
      </div>
    </div>
  );
};

export default TotalsOverview;