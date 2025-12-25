import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { TrendingDown, Zap, DollarSign, Target } from "lucide-react";

const EnergyAnalysis = ({ activeTab }) => {
  // 1. Logika Data Dummy Dinamis (Cards & Charts)
  const dataStore = useMemo(() => {
    if (activeTab === "Harian") {
      return {
        cards: { total: "45.2", cost: "65.400", eff: "94", save: "12.000" },
        comparison: Array.from({ length: 24 }, (_, i) => ({
          label: `${i}:00`,
          prev: Math.floor(Math.random() * 200) + 100,
          current: Math.floor(Math.random() * 200) + 100,
        })),
        loadProfile: Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          usage:
            Math.floor(Math.random() * 300) + (i > 8 && i < 17 ? 500 : 100),
        })),
        insight:
          "Beban puncak harian terjadi pada jam operasional siang hari (10:00 - 14:00).",
      };
    } else if (activeTab === "Bulanan") {
      return {
        cards: {
          total: "1.250",
          cost: "1.820.000",
          eff: "91",
          save: "240.000",
        },
        comparison: [
          { label: "Minggu 1", prev: 320, current: 310 },
          { label: "Minggu 2", prev: 280, current: 340 },
          { label: "Minggu 3", prev: 350, current: 300 },
          { label: "Minggu 4", prev: 300, current: 320 },
        ],
        loadProfile: Array.from({ length: 30 }, (_, i) => ({
          hour: `Tgl ${i + 1}`,
          usage: Math.floor(Math.random() * 40) + 30,
        })),
        insight:
          "Penggunaan energi minggu ke-2 meningkat 15% dikarenakan aktivitas lembur.",
      };
    } else {
      // TAHUNAN
      return {
        cards: {
          total: "14.520",
          cost: "21.150.000",
          eff: "89",
          save: "2.800.000",
        },
        comparison: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ].map((m) => ({
          label: m,
          prev: Math.floor(Math.random() * 1000) + 800,
          current: Math.floor(Math.random() * 1000) + 800,
        })),
        loadProfile: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ].map((m) => ({
          hour: m,
          usage: Math.floor(Math.random() * 1200) + 900,
        })),
        insight:
          "Tren tahunan menunjukkan konsumsi tertinggi pada bulan Juli saat musim panas.",
      };
    }
  }, [activeTab]);

  const getPeriodLabel = () => {
    switch (activeTab) {
      case "Harian":
        return "Per Jam (Hari ini vs Kemarin)";
      case "Bulanan":
        return "Per Minggu (Bulan ini vs Bulan lalu)";
      case "Tahunan":
        return "Per Bulan (Tahun ini vs Tahun lalu)";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* SECTION 1: Top Metrics Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalysisCard
          title="Total Konsumsi"
          value={dataStore.cards.total}
          unit="kWh"
          sub={`Total ${activeTab}`}
          icon={<Zap size={20} />}
          color="text-et-blue"
        />
        <AnalysisCard
          title="Estimasi Biaya"
          value={dataStore.cards.cost}
          unit="IDR"
          sub={`Estimasi ${activeTab}`}
          icon={<DollarSign size={20} />}
          color="text-et-green"
        />
        <AnalysisCard
          title="Efisiensi"
          value={dataStore.cards.eff}
          unit="%"
          sub="Performance Score"
          icon={<Target size={20} />}
          color="text-et-yellow"
        />
        <AnalysisCard
          title="Penghematan"
          value={dataStore.cards.save}
          unit="IDR"
          sub="Cost Avoidance"
          icon={<TrendingDown size={20} />}
          color="text-red-500"
        />
      </div>

      {/* SECTION 2: Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                Analisis Perbandingan Konsumsi
              </h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
                {getPeriodLabel()}
              </p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataStore.comparison}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tick={{ fill: "#94a3b8" }}
                  interval={activeTab === "Harian" ? 3 : 0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(40, 40, 40, 0.09)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "10px", paddingBottom: "20px" }}
                />
                <Bar
                  name="Periode Lalu"
                  dataKey="prev"
                  fill="#cbd5e1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Periode Ini"
                  dataKey="current"
                  fill="#2B5797"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Load Profile Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">
              Profil Beban
            </h3>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
              Distribusi Penggunaan {activeTab}
            </p>
          </div>
          <div className="flex-1 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataStore.loadProfile}>
                <XAxis dataKey="hour" hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#438241"
                  fill="#438241"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-et-blue uppercase tracking-tighter">
              AI Insight
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {dataStore.insight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisCard = ({ title, value, unit, sub, icon, color }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-start justify-between mb-2">
      <div className="flex flex-col gap-0.5">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter opacity-80">
          {title}
        </p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-lg font-black text-slate-800 dark:text-white leading-none">
            {value}
          </h4>
          <span className="text-[9px] font-bold text-slate-400 uppercase">
            {unit}
          </span>
        </div>
      </div>

      {/* Ikon dibuat lebih kecil dan diletakkan di pojok kanan atas */}
      <div
        className={`w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${color} shrink-0`}
      >
        {React.cloneElement(icon, { size: 16 })}
      </div>
    </div>

    {/* Sub-text diletakkan di bawah dengan margin tipis */}
    <p className="text-[9px] font-bold text-slate-500/70 dark:text-slate-400/60 capitalize leading-tight">
      {sub}
    </p>
  </div>
);

export default EnergyAnalysis;
