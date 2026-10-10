import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store";
import {
  fetchTransactions,
  fetchMonthlySummary,
  deleteTransaction,
  setActiveType,
} from "../../store/transactionSlice";

import { TransactionHeader } from "../TransactionPage/TransactionHeader";
import { TransactionForm } from "../TransactionPage/TransactionForm";
import { TransactionTabs } from "../TransactionPage/TransactionTabs";
import { TransactionTable } from "../TransactionPage/TransactionTable";
import { MonthlySummary } from "../TransactionPage/MonthlySummary";

import type { TransactionType } from "../../types/transaction";

export const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { transactions, summary } = useSelector(
    (state: RootState) => state.transactions
  );

  const activeType: TransactionType = location.pathname.includes("income")
    ? "income"
    : "expense";

  useEffect(() => {
    dispatch(setActiveType(activeType));
    dispatch(fetchTransactions(activeType));
    dispatch(fetchMonthlySummary(activeType));
  }, [dispatch, activeType]);

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction({ id, type: activeType }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0d071e] flex flex-col px-4 sm:px-8 lg:px-16 py-6 text-white">
      <TransactionHeader />

      <TransactionTabs activeType={activeType} />

      <div className="bg-[#181236] rounded-b-3xl rounded-tr-3xl p-4 sm:p-[30px] shadow-[0px_10px_60px_rgba(0,0,0,0.4)] border border-[#251d4a]">
        <TransactionForm />

        <div className="flex flex-col lg:flex-row gap-6 items-start mt-6">
          <div className="w-full flex-1 order-2 lg:order-1">
            <TransactionTable
              transactions={transactions}
              activeType={activeType}
              onDelete={handleDelete}
            />
          </div>

          <div className="w-full lg:w-auto order-1 lg:order-2">
            <MonthlySummary summary={summary} />
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default TransactionsPage;