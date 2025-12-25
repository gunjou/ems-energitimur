import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const CostForecast = ({ activeTab }) => {
  // 1. Data Dummy Dinamis untuk Finansial
  const costData = useMemo(() => {
    if (activeTab === "Harian") {
      return {
        cards: {
          current: "65.400",
          forecast: "72.000",
          budget: "100.000",
          avg: "2.725",
        },
        // Kumulatif Biaya per jam (Uang bertambah terus)
        trend: Array.from({ length: 24 }, (_, i) => ({
          label: `${i}:00`,
          actual: i < 15 ? Math.floor(i * 3000 + Math.random() * 1000) : null,
          prediction: i >= 14 ? Math.floor(i * 3100) : null,
        })),
        breakdown: [
          { name: "Beban Tetap", value: 20000, fill: "#2B5797" },
          { name: "Pemakaian", value: 45400, fill: "#438241" },
        ],
      };
    } else if (activeTab === "Bulanan") {
      return {
        cards: {
          current: "1.820.000",
          forecast: "2.400.000",
          budget: "2.500.000",
          avg: "60.600",
        },
        // Kumulatif Biaya per tanggal
        trend: Array.from({ length: 30 }, (_, i) => ({
          label: `${i + 1}`,
          actual: i < 20 ? Math.floor(i * 90000 + Math.random() * 5000) : null,
          prediction: i >= 19 ? Math.floor(i * 92000) : null,
        })),
        breakdown: [
          { name: "Tarif Puncak", value: 800000, fill: "#EF4444" },
          { name: "Tarif Normal", value: 1020000, fill: "#2B5797" },
        ],
      };
    } else {
      // TAHUNAN
      return {
        cards: {
          current: "21.150.000",
          forecast: "25.000.000",
          budget: "24.000.000",
          avg: "1.760.000",
        },
        trend: [
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
        ].map((m, i) => ({
          label: m,
          actual: i < 10 ? Math.floor(1800000 + Math.random() * 200000) : null,
          prediction: i >= 9 ? 1900000 : null,
        })),
        breakdown: [
          { name: "Pemakaian", value: 18000000, fill: "#2B5797" },
          { name: "Pajak/PPJ", value: 2150000, fill: "#FBC02D" },
          { name: "Denda PF", value: 1000000, fill: "#EF4444" },
        ],
      };
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* SECTION 1: Financial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CostCard
          title="Tagihan Berjalan"
          value={costData.cards.current}
          unit="IDR"
          icon={<Wallet size={20} />}
          color="text-et-blue"
          sub="Hingga saat ini"
        />
        <CostCard
          title="Prediksi Akhir"
          value={costData.cards.forecast}
          unit="IDR"
          icon={<TrendingUp size={20} />}
          color="text-et-green"
          sub="Estimasi sistem"
          isAlert={
            parseFloat(costData.cards.forecast.replace(/\./g, "")) >
            parseFloat(costData.cards.budget.replace(/\./g, ""))
          }
        />
        <CostCard
          title="Batas Anggaran"
          value={costData.cards.budget}
          unit="IDR"
          icon={<AlertCircle size={20} />}
          color="text-et-yellow"
          sub="Limit ditetapkan"
        />
        <CostCard
          title="Rerata Biaya"
          value={costData.cards.avg}
          unit="IDR"
          icon={<Calendar size={20} />}
          color="text-slate-500"
          sub={`Per ${activeTab === "Tahunan" ? "Bulan" : "Hari"}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Akumulasi & Prediksi (2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                Tren Akumulasi Biaya
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Aktual vs Proyeksi Prediksi
              </p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-et-blue rounded-full"></span> AKTUAL
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-slate-300 rounded-full"></span>{" "}
                PREDIKSI
              </div>
            </div>
          </div>

          <div className="h-[16rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costData.trend}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B5797" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2B5797" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [
                    `Rp ${value?.toLocaleString("id-ID")}`,
                    "Biaya",
                  ]}
                />
                {/* Garis Budget sebagai Referensi */}
                <ReferenceLine
                  y={parseFloat(costData.cards.budget.replace(/\./g, ""))}
                  stroke="#FBC02D"
                  strokeDasharray="5 5"
                  label={{
                    position: "right",
                    value: "Limit",
                    fill: "#FBC02D",
                    fontSize: 10,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="prediction"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#2B5797"
                  strokeWidth={3}
                  fill="url(#colorActual)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Panel (1/3) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6">
              Komposisi Biaya
            </h3>
            <div className="space-y-4">
              {costData.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    ></div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    Rp {item.value.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-et-blue p-6 rounded-3xl text-white shadow-lg shadow-et-blue/20 dark:bg-slate-900 relative overflow-hidden group">
            <ArrowUpRight className="absolute -right-4 -top-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">
              Rekomendasi Hemat
            </h4>
            <p className="text-sm mt-3 font-medium leading-relaxed">
              Anda bisa menghemat hingga{" "}
              <span className="font-bold text-et-yellow text-lg block">
                Rp 120.000
              </span>{" "}
              jika mematikan beban non-esensial di jam 17:00.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-komponen Khusus Card Biaya
const CostCard = ({ title, value, unit, icon, color, sub, isAlert }) => (
  <div
    className={`bg-white dark:bg-slate-900 p-4 rounded-3xl border shadow-sm transition-all ${
      isAlert
        ? "border-red-500 ring-4 ring-red-500/5"
        : "border-slate-100 dark:border-slate-800"
    }`}
  >
    {/* Header: Icon dan Title dalam satu baris */}
    <div className="flex items-center gap-3 ">
      <div
        className={`w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${
          isAlert ? "text-red-500 animate-pulse" : color
        }`}
      >
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
        {title}
      </p>
    </div>

    {/* Content: Value dan Subtitle */}
    <div className="space-y-0.5">
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] font-bold text-slate-400">{unit}</span>
        <h4 className="text-xl font-black text-slate-800 dark:text-white tabular-nums">
          {value}
        </h4>
      </div>
      <p
        className={`text-[9px] font-bold uppercase ${
          isAlert ? "text-red-500" : "text-slate-500 opacity-70"
        }`}
      >
        {isAlert ? "⚠️ Over Budget" : sub}
      </p>
    </div>
  </div>
);

export default CostForecast;
