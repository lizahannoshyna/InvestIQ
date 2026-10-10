import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchReportsData } from "../../store/reportsSlice";
import { TransactionHeader } from "../TransactionPage/TransactionHeader";
import {ReportsTopBar} from "../ReportsPage/ReportsTopBar";
import {TotalsOverview} from "../ReportsPage/TotalsOverview";
import {CategoryGrid} from "../ReportsPage/CategoryGrid";
import {CategoryChart} from "../ReportsPage/CategoryChart";

export const ReportsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    selectedMonth, 
    selectedYear, 
    totalExpenses, 
    totalIncome, 
    expenseCategories,
    incomeCategories,
    expenseChartData,
    incomeChartData,
    loading 
  } = useAppSelector((state) => state.reports);

  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  useEffect(() => {
    dispatch(fetchReportsData({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  if (loading) {
    return <div className="text-white text-center py-20">Завантаження звітів...</div>;
  }

  const currentCategories = activeTab === "expense" ? expenseCategories : incomeCategories;
  const currentChartData = activeTab === "expense" ? expenseChartData : incomeChartData;

  return (
    <div className="min-h-screen w-full bg-[#0d071e] flex flex-col px-4 sm:px-8 lg:px-16 py-6 gap-6">
      <TransactionHeader />
      <ReportsTopBar />
      
      <TotalsOverview totalExpenses={totalExpenses} totalIncome={totalIncome} />

      <div className="flex gap-3 bg-[#181236] p-1.5 rounded-2xl w-fit border border-[#251d4a]">
        <button
          onClick={() => setActiveTab("expense")}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "expense"
              ? "bg-[#cdf27e] text-slate-900 shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Витрати за категоріями
        </button>
        <button
          onClick={() => setActiveTab("income")}
          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "income"
              ? "bg-[#cdf27e] text-slate-900 shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Доходи за категоріями
        </button>
      </div>

      <CategoryGrid 
        categories={currentCategories} 
        onSelectCategory={(id: string) => console.log("Обрано категорію:", id)} 
      />
      
      <CategoryChart data={currentChartData} />
    </div>
  );
};

export default ReportsPage;