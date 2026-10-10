import React from "react";
import type { TransactionType } from "../../types/transaction";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  categories?: { name: string };
}

interface Props {
  transactions: Transaction[];
  activeType: TransactionType;
  onDelete: (id: string) => void;
}

export const TransactionTable: React.FC<Props> = ({
  transactions,
  activeType,
  onDelete,
}) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateStr;
  };

  return (
    <div className="flex-1 max-h-[380px] overflow-y-auto overflow-x-auto w-full">
      <table className="w-full border-collapse text-left min-w-[550px] sm:min-w-full">
        <thead>
          <tr className="bg-[#100b26] h-10 font-bold text-xs text-[#a2a0b3]">
            <th className="pl-5 rounded-l-lg">ДАТА</th>
            <th>ОПИС</th>
            <th>КАТЕГОРІЯ</th>
            <th>СУМА</th>
            <th className="rounded-r-lg"></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="border-b border-[#251d4a] h-10 text-xs text-[#d1cfdf] hover:bg-[#211a47] transition-colors"
            >
              <td className="pl-5 whitespace-nowrap">{formatDate(tx.date)}</td>
              <td className="max-w-[150px] sm:max-w-xs truncate">{tx.description}</td>
              <td className="whitespace-nowrap">{tx.categories?.name || "Інше"}</td>
              <td
                className={`font-bold whitespace-nowrap ${
                  activeType === "expense" ? "text-[#E7192E]" : "text-[#4070E6]"
                }`}
              >
                {activeType === "expense"
                  ? `- ${Number(tx.amount).toFixed(2)} грн.`
                  : `${Number(tx.amount).toFixed(2)} грн.`}
              </td>
              <td className="text-center pr-2.5">
                <button
                  type="button"
                  onClick={() => onDelete(tx.id)}
                  className="bg-transparent border-none cursor-pointer text-sm p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Видалити"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};