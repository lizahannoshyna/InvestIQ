import React from "react";

interface CategoryItem {
  id: string;
  name: string;
  amount: number;
  icon: string; 
}

interface Props {
  categories: CategoryItem[];
  onSelectCategory: (id: string) => void;
}

export const CategoryGrid: React.FC<Props> = ({ categories, onSelectCategory }) => {
  return (
    <div className="bg-[#181236] border border-[#251d4a] rounded-3xl p-6 mb-8 shadow-xl">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="bg-[#100b26] border border-[#251d4a] hover:border-[#cdf27e]/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all group"
          >
            <span className="text-xs text-gray-400 mb-2 font-semibold">
              {cat.amount.toLocaleString("uk-UA", { minimumFractionDigits: 2 })}
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#181236] flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};