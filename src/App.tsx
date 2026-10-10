import React from 'react'
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import { checkAuthSession } from "./store/authSlice";
import "./App.css";

const AuthPage = lazy(() => import("./Components/pages/AuthPage"));
const TransactionsPage = lazy(() => import("./Components/pages/TransactionsPage"));
const ReportsPage = lazy(() => import("./Components/pages/ReportsPage"));

const PageLoader = () => (
  <div className="min-h-screen bg-[#0d071e] text-[#cdf27e] flex items-center justify-center font-sans">
    <div className="text-xl font-semibold animate-pulse">Завантаження...</div>
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/InvestIQ" element={<TransactionsPage />}>
              <Route index element={<Navigate to="expenses" replace />} />
              <Route path="expenses" element={null} />
              <Route path="income" element={null} />
            </Route>

            <Route path="/InvestIQ/reports" element={<ReportsPage />} />

            <Route path="/" element={<Navigate to="/InvestIQ/expenses" replace />} />
            <Route path="/login" element={<Navigate to="/InvestIQ/expenses" replace />} />
            <Route path="*" element={<Navigate to="/InvestIQ/expenses" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;