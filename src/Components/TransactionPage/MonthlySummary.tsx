import React from "react";

interface SummaryItem {
  month: string;
  total: number;
}

interface Props {
  summary: SummaryItem[];
}

export const MonthlySummary: React.FC<Props> = ({ summary }) => {
  return (
    <div className="w-full md:w-[210px] bg-[#100b26] rounded-2xl md:rounded-t-2xl md:rounded-br-2xl overflow-hidden border border-[#251d4a]">
      <div className="text-center font-bold text-xs py-3 border-b border-[#251d4a] text-white">
        ЗВЕДЕННЯ
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {summary.map((item) => (
          <div
            key={item.month}
            className="flex justify-between px-5 py-2.5 border-b border-[#251d4a] text-xs text-[#a2a0b3] last:border-b-0"
          >
            <span>{item.month}</span>
            <span className="font-semibold text-white">
              {item.total.toLocaleString("uk-UA", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};