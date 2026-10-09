import React from "react";
import { NavLink } from "react-router-dom";
import type { TransactionType } from "../../types/transaction";

interface Props {
  activeType: TransactionType;
}

export const TransactionTabs: React.FC<Props> = ({ activeType }) => {
  return (
    <div className="flex gap-0.5">
      <NavLink
        to="expenses"
        className={`px-9 py-3.5 rounded-t-2xl font-bold text-xs inline-block text-center transition-colors ${activeType === "expense"
            ? "bg-[#181236] text-[#FF751D]"
            : "bg-[#FAFBFD]/10 text-white hover:bg-[#FAFBFD]/20"
          }`}
      >
        ВИТРАТИ
      </NavLink>

      <NavLink
        to="income"
        className={`px-9 py-3.5 rounded-t-2xl font-bold text-xs inline-block text-center transition-colors ${activeType === "income"
            ? "bg-[#181236] text-[#FF751D]"
            : "bg-[#FAFBFD]/10 text-white hover:bg-[#FAFBFD]/20"
          }`}
      >
        ДОХІД
      </NavLink>
    </div>
  );
};
