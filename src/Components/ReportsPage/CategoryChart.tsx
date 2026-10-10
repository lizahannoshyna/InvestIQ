import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartItem {
  label: string;
  amount: number;
}

interface Props {
  data: ChartItem[];
}

export const CategoryChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Витрати (грн)",
        data: data.map((item) => item.amount),
        backgroundColor: "#cdf27e",
        borderRadius: 8,
        barThickness: 28, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        backgroundColor: "#100b26",
        titleColor: "#ffffff",
        bodyColor: "#cdf27e",
        borderColor: "#251d4a",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9ca3af", 
          font: {
            size: 11,
          },
        },
        border: {
          color: "#251d4a",
        },
      },
      y: {
        grid: {
          color: "#251d4a",
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-[#181236] border border-[#251d4a] rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#cdf27e]">📊</span>
          <h3 className="text-white font-bold text-sm">Топ витрат за категоріями</h3>
        </div>
        <button 
          type="button"
          className="text-xs text-gray-400 border border-[#251d4a] px-4 py-1.5 rounded-xl hover:text-white hover:border-gray-500 transition-colors"
        >
          ДЕТАЛІЗАЦІЯ
        </button>
      </div>

      <div className="h-64 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};