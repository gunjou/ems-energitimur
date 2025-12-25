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
  Cell,
} from "recharts";
import { Leaf, Cloud, Wind, ZapOff, TreeDeciduous } from "lucide-react";

const Sustainability = ({ activeTab }) => {
  // 1. Data Dummy Dinamis untuk Sustainability
  const sustainData = useMemo(() => {
    const r = (min, max) => Math.floor(Math.random() * (max - min) + min);

    if (activeTab === "Harian") {
      return {
        cards: { co2: "12.4", trees: "0.8", green: "92", avoided: "2.1" },
        chart: Array.from({ length: 24 }, (_, i) => ({
          label: `${i}:00`,
          emisi: parseFloat((Math.random() * 2 + 1).toFixed(2)),
        })),
        impact: "Setara dengan mematikan 15 lampu jalan malam ini.",
      };
    } else if (activeTab === "Bulanan") {
      return {
        cards: { co2: "385.2", trees: "24", green: "88", avoided: "45.5" },
        chart: Array.from({ length: 4 }, (_, i) => ({
          label: `Minggu ${i + 1}`,
          emisi: r(80, 120),
        })),
        impact: "Anda telah menyelamatkan area hutan seluas 120 m² bulan ini.",
      };
    } else {
      // TAHUNAN
      return {
        cards: { co2: "4.620", trees: "284", green: "85", avoided: "540" },
        chart: [
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
          emisi: r(300, 500),
        })),
        impact:
          "Reduksi emisi tahun ini setara dengan menanam 284 pohon dewasa.",
      };
    }
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* SECTION 1: Sustainability Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SustainCard
          title="Emisi Karbon"
          value={sustainData.cards.co2}
          unit="kgCO2"
          icon={<Cloud />}
          color="text-emerald-500"
          sub="Total emisi"
        />
        <SustainCard
          title="Setara Pohon"
          value={sustainData.cards.trees}
          unit="Pohon"
          icon={<TreeDeciduous />}
          color="text-green-600"
          sub="Pohon terselamatkan"
        />
        <SustainCard
          title="Skor Hijau"
          value={sustainData.cards.green}
          unit="pts"
          icon={<Leaf />}
          color="text-teal-500"
          sub="Indeks keberlanjutan"
        />
        <SustainCard
          title="Emisi Terhindar"
          value={sustainData.cards.avoided}
          unit="kgCO2"
          icon={<ZapOff />}
          color="text-sky-500"
          sub="Hasil efisiensi"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Carbon Intensity (2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                Intensitas Emisi Karbon
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Jejak Karbon {activeTab} (kgCO2)
              </p>
            </div>
          </div>
          <div className="h-[15rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sustainData.chart}>
                <defs>
                  <linearGradient id="colorEmisi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                  interval={activeTab === "Harian" ? 3 : 0}
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
                  formatter={(val) => [`${val} kgCO2`, "Emisi"]}
                />
                <Area
                  type="monotone"
                  dataKey="emisi"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorEmisi)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel: Impact & Social (1/3) */}
        <div className="space-y-6">
          <div className="bg-emerald-600 p-6 rounded-3xl dark:bg-slate-900 text-white shadow-lg shadow-emerald-600/20 relative overflow-hidden group">
            <TreeDeciduous className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">
              Dampak Sosial
            </h4>
            <p className="text-lg mt-4 font-black leading-tight">
              {sustainData.impact}
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold bg-emerald-700/50 w-fit px-3 py-1.5 rounded-full">
              <Wind size={12} /> BERKONTRIBUSI PADA NET ZERO 2060
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6 text-center">
              Analisis Sumber Emisi
            </h3>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-emerald-600">
                  {activeTab === "Tahunan" ? "12%" : "5%"}
                </div>
                <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase text-center">
                  Solar Energy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center font-black text-slate-400">
                  {activeTab === "Tahunan" ? "88%" : "95%"}
                </div>
                <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase text-center">
                  PLN Grid
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SustainCard Component
const SustainCard = ({ title, value, unit, icon, color, sub }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]">
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}
      >
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
        {title}
      </p>
    </div>
    <div className="space-y-0.5">
      <div className="flex items-baseline gap-1">
        <h4 className="text-xl font-black text-slate-800 dark:text-white tabular-nums">
          {value}
        </h4>
        <span className="text-[10px] font-bold text-slate-400">{unit}</span>
      </div>
      <p className="text-[9px] font-bold text-slate-500 uppercase opacity-70 tracking-tighter">
        {sub}
      </p>
    </div>
  </div>
);

export default Sustainability;
