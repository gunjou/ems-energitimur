import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  ComposedChart,
  Area,
} from "recharts";
import { Zap, Activity, ShieldCheck, AlertOctagon, Info } from "lucide-react";

const PowerQuality = ({ activeTab }) => {
  // 1. Logika Real-time khusus Power Quality
  const [realtimeData, setRealtimeData] = useState(() => {
    // Membuat 20 data awal agar grafik tidak kosong saat dimuat
    return Array.from({ length: 20 }, (_, i) => {
      // Membuat waktu mundur ke belakang agar terlihat natural
      const time = new Date();
      time.setSeconds(time.getSeconds() - (20 - i) * 3);

      return {
        time: time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        voltage: parseFloat((218 + Math.random() * 6).toFixed(1)),
        current: parseFloat((10 + Math.random() * 5).toFixed(2)),
        pf: parseFloat((0.94 + Math.random() * 0.05).toFixed(2)),
      };
    });
  });

  // 2. Data Dummy History (Harian, Bulanan, Tahunan)
  const historyData = useMemo(() => {
    const generateHistory = (len, vMin, vMax, aMin, aMax) =>
      Array.from({ length: len }, (_, i) => ({
        time: `${i}:00`,
        voltage: parseFloat((Math.random() * (vMax - vMin) + vMin).toFixed(1)),
        current: parseFloat((Math.random() * (aMax - aMin) + aMin).toFixed(2)),
        pf: parseFloat((0.92 + Math.random() * 0.07).toFixed(2)),
      }));

    return {
      Harian: generateHistory(24, 218, 224, 10, 15),
      Bulanan: Array.from({ length: 30 }, (_, i) => ({
        time: `Tgl ${i + 1}`,
        voltage: 220,
        current: 12,
        pf: parseFloat((0.88 + Math.random() * 0.1).toFixed(2)),
      })),
      Tahunan: [
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
        time: m,
        voltage: 220.5,
        current: 12.5,
        pf: 0.96,
      })),
    };
  }, [activeTab]);

  // 3. Logika Real-time khusus Power Quality
  useEffect(() => {
    if (activeTab === "Realtime") {
      const interval = setInterval(() => {
        setRealtimeData((prev) => {
          // Tetap menjaga 20 data di layar (sliding window)
          const newData = [...prev.slice(1)];
          newData.push({
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            voltage: parseFloat((218 + Math.random() * 6).toFixed(1)),
            current: parseFloat((10 + Math.random() * 5).toFixed(2)),
            pf: parseFloat((0.94 + Math.random() * 0.05).toFixed(2)),
          });
          return newData;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const activeData =
    activeTab === "Realtime" ? realtimeData : historyData[activeTab];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* SECTION 1: Power Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PQCard
          title="Rerata PF"
          value={
            activeData.length > 0
              ? activeData[activeData.length - 1].pf
              : "0.00"
          }
          unit="cos φ"
          icon={<ShieldCheck />}
          color="text-et-blue"
          sub="Kualitas Daya"
        />
        <PQCard
          title="Tegangan"
          value={
            activeData.length > 0
              ? activeData[activeData.length - 1].voltage
              : "0.0"
          }
          unit="V"
          icon={<Zap />}
          color="text-et-yellow"
          sub="V-Nominal 220V"
        />
        <PQCard
          title="Beban Arus"
          value={
            activeData.length > 0
              ? activeData[activeData.length - 1].current
              : "0.0"
          }
          unit="A"
          icon={<Activity />}
          color="text-et-green"
          sub="Total Amperage"
        />
        <PQCard
          title="Anomali"
          value={activeTab === "Realtime" ? "0" : "3"}
          unit="Events"
          icon={<AlertOctagon />}
          color="text-red-500"
          sub={activeTab}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dual-Line Chart: V & A Correlation (2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                Korelasi Tegangan & Arus
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Stabilitas Distribusi Daya ({activeTab})
              </p>
            </div>
            <div className="flex gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-et-yellow">
                <span className="w-2 h-2 rounded-full bg-et-yellow"></span>{" "}
                VOLTAGE (V)
              </span>
              <span className="flex items-center gap-1.5 text-et-green">
                <span className="w-2 h-2 rounded-full bg-et-green"></span>{" "}
                CURRENT (A)
              </span>
            </div>
          </div>
          <div className="h-[15rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis
                  dataKey="time"
                  hide={activeTab === "Realtime"}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  domain={[200, 240]}
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 30]}
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <ReferenceLine
                  yAxisId="left"
                  y={220}
                  stroke="#cbd5e1"
                  strokeDasharray="3 3"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="voltage"
                  stroke="#FBC02D"
                  strokeWidth={3}
                  dot={false}
                  animationDuration={500}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="current"
                  fill="#438241"
                  stroke="#438241"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Power Factor Stability (1/3) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-sm">
            Stabilitas Power Factor
          </h3>
          <div className="flex-1 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.05}
                />
                <XAxis dataKey="time" hide />
                <YAxis
                  domain={[0.8, 1]}
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <ReferenceLine
                  y={0.85}
                  stroke="#EF4444"
                  strokeDasharray="3 3"
                  label={{
                    value: "Limit PF",
                    position: "insideBottomRight",
                    fontSize: 9,
                    fill: "#EF4444",
                  }}
                />
                <Line
                  type="stepAfter"
                  dataKey="pf"
                  stroke="#2B5797"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-3">
            <Info className="text-et-blue shrink-0" size={16} />
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              PF rata-rata berada di angka{" "}
              <span className="font-bold">0.96</span>. Tidak ditemukan indikasi
              kerugian daya reaktif yang signifikan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// PQCard Component
const PQCard = ({ title, value, unit, icon, color, sub }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 ${color}`}
      >
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
      <p className="text-[9px] font-bold text-slate-500 uppercase opacity-70">
        {sub}
      </p>
    </div>
  </div>
);

export default PowerQuality;
