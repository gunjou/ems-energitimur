import React from "react";
import { TrendingUp } from "lucide-react";

const StatCard = ({
  label,
  value,
  unit,
  icon,
  color,
  trend,
  isActive,
  onClick,
  isHistory,
}) => {
  const bgAccentColor = color.replace(/^text-/, "bg-");

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border transition-all duration-500 overflow-hidden relative ${
        isActive
          ? `border-2 border-et-blue ring-4 ring-et-blue/10 scale-[1.02]`
          : `border-slate-100 dark:border-slate-800 hover:border-et-blue/30`
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div
          className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800 ${color}`}
        >
          {icon}
        </div>

        {/* Tampilan Label Trend vs Label History */}
        <span
          className={`text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${
            isHistory
              ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400" // Warna netral untuk History
              : trend.startsWith("+")
              ? "text-red-500 bg-red-50 dark:bg-red-500/10"
              : "text-et-green bg-green-50 dark:bg-green-500/10"
          }`}
        >
          {!isHistory &&
            (trend.startsWith("+") ? (
              <TrendingUp size={10} />
            ) : (
              <TrendingUp size={10} className="rotate-180" />
            ))}
          {trend}
        </span>
      </div>

      {/* Value & Label */}
      <div>
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tabular-nums">
            {value}
          </h3>
          <span className="text-xs font-bold text-slate-400 uppercase">
            {/* Ubah unit W menjadi kWh jika mode history agar akurat */}
            {isHistory && label === "Konsumsi" ? "kWh" : unit}
          </span>
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase opacity-70">
          {label}
        </p>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1.5 w-full transition-all duration-300 ${bgAccentColor} ${
          isActive ? "opacity-100 h-2" : "opacity-30 h-1"
        }`}
      ></div>
    </div>
  );
};

export default StatCard;
