import React, { useState, useEffect, useMemo } from "react";
import {
  Zap,
  Activity,
  TrendingUp,
  Leaf,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import RealtimeLoadChart from "../components/charts/RealtimeLoadChart";
import StatCard from "../components/charts/StatCard";

const Overview = ({ activeTab }) => {
  const [activeMetric, setActiveMetric] = useState("watt");

  // DATA DUMMY HISTORY (Statis untuk mode Harian/Bulanan/Tahunan)
  const historyData = {
    Harian: {
      watt: 45.2, // Ini TOTAL kWh hari ini
      voltage: 220.5, // Ini RATA-RATA Voltase hari ini
      current: 12.1, // Ini RATA-RATA Arus hari ini
      emission: 38.4, // Ini TOTAL Emisi hari ini
    },
    Bulanan: {
      watt: 1250.8, // TOTAL kWh bulan ini
      voltage: 219.2, // RATA-RATA Voltase bulan ini
      current: 11.5, // RATA-RATA Arus bulan ini
      emission: 950.2, // TOTAL Emisi bulan ini
    },
    Tahunan: {
      watt: 15420.5, // TOTAL kWh tahun ini
      voltage: 221.0, // RATA-RATA Voltase tahun ini
      current: 12.4, // RATA-RATA Arus tahun ini
      emission: 12500.8, // TOTAL Emisi tahun ini
    },
  };

  // SEKARANG DATA HISTORY UNIK PER METRIK
  const historyChartData = useMemo(() => {
    // Fungsi pembantu untuk generate data random berdasarkan range tertentu
    const generateData = (length, min, max, labelPrefix = "") =>
      Array.from({ length }, (_, i) => ({
        time: labelPrefix ? `${labelPrefix} ${i + 1}` : `${i}:00`,
        value: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
      }));

    // Konfigurasi range data per metrik untuk history
    const ranges = {
      watt: { harian: [1000, 2000], bulanan: [30, 60], tahunan: [1000, 1500] },
      voltage: { harian: [215, 225], bulanan: [218, 222], tahunan: [219, 221] },
      current: { harian: [10, 15], bulanan: [8, 12], tahunan: [10, 13] },
      emission: {
        harian: [0.5, 1.2],
        bulanan: [0.7, 1.0],
        tahunan: [0.8, 1.1],
      },
    };

    const r = ranges[activeMetric];

    return {
      Harian: generateData(24, r.harian[0], r.harian[1]),
      Bulanan: generateData(30, r.bulanan[0], r.bulanan[1], "Tgl"),
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
        value: parseFloat(
          (
            Math.random() * (r.tahunan[1] - r.tahunan[0]) +
            r.tahunan[0]
          ).toFixed(2)
        ),
      })),
    };
  }, [activeMetric]); // Sekarang data berubah mengikuti metrik yang diklik

  // State untuk nilai sekarang
  const [liveValues, setLiveValues] = useState({
    watt: 55,
    voltage: 224.5,
    current: 12.84,
    emission: 0.85,
  });

  // State untuk menyimpan trend persentase
  const [trends, setTrends] = useState({
    watt: "0.0%",
    voltage: "0.0%",
    current: "0.0%",
    emission: "0.0%",
  });
  const [powerQuality, setPowerQuality] = useState(0.98);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Sistem Aktif",
      time: "Baru saja",
      type: "success",
      msg: "Monitoring berjalan normal",
    },
  ]);

  // Helper untuk menentukan label status di bawah StatCard
  const getSubLabel = (metricId) => {
    if (activeTab === "Realtime") return "Real-time";

    // Jika Harian/Bulanan/Tahunan
    if (metricId === "watt" || metricId === "emission") {
      return `Total ${activeTab}`;
    }
    return `Rerata ${activeTab}`;
  };

  // Interval Global dan trend untuk Update Angka
  useEffect(() => {
    if (activeTab === "Realtime") {
      const interval = setInterval(() => {
        setLiveValues((prev) => {
          const nextValues = {
            watt: Math.floor(Math.random() * (70 - 40) + 40), // Kita naikkan range watt untuk simulasi alert
            voltage: parseFloat((Math.random() * (245 - 210) + 210).toFixed(1)), // Voltase bisa naik sampai 245
            current: parseFloat((Math.random() * (18 - 10) + 10).toFixed(2)),
            emission: parseFloat(
              (Math.random() * (1.2 - 0.7) + 0.7).toFixed(2)
            ),
          };

          // 1. Hitung Trend
          const newTrends = {};
          Object.keys(nextValues).forEach((key) => {
            const diff = nextValues[key] - prev[key];
            const percent = (diff / prev[key]) * 100;
            newTrends[key] = `${percent >= 0 ? "+" : ""}${percent.toFixed(1)}%`;
          });
          setTrends(newTrends);

          // 2. Update Power Quality (Cos Phi) secara dinamis
          setPowerQuality(parseFloat((0.95 + Math.random() * 0.04).toFixed(2)));

          // 3. Logika Alerts (Cek jika melebihi standar)
          const newAlerts = [];
          if (nextValues.voltage > 240) {
            newAlerts.push({
              id: Date.now(),
              title: "Overvoltage!",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "warning",
              msg: `Tegangan tinggi terdeteksi: ${nextValues.voltage}V`,
            });
          }
          if (nextValues.watt > 2000) {
            newAlerts.push({
              id: Date.now() + 1,
              title: "High Load",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "danger",
              msg: `Beban melebihi 2kW: ${nextValues.watt}W`,
            });
          }

          if (newAlerts.length > 0) {
            setAlerts((prevAlerts) =>
              [newAlerts[0], ...prevAlerts].slice(0, 4)
            ); // Simpan 4 alert terbaru
          }

          return nextValues;
        });
      }, 3000);
      return () => clearInterval(interval);
    } else {
      // JIKA BUKAN REALTIME, SET DATA STATIS DARI HISTORY
      setLiveValues(historyData[activeTab]);
      setTrends({
        watt: "0.0%",
        voltage: "0.0%",
        current: "0.0%",
        emission: "0.0%",
      });
      setPowerQuality(0.97); // Nilai statis untuk history
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]); // Triger setiap kali tab berubah

  const metrics = [
    {
      id: "watt",
      label: "Konsumsi",
      unit: "kW",
      icon: <TrendingUp size={20} />,
      color: "text-et-yellow",
    },
    {
      id: "voltage",
      label: "Tegangan",
      unit: "V",
      icon: <Zap size={20} />,
      color: "text-blue-500",
    },
    {
      id: "current",
      label: "Arus",
      unit: "A",
      icon: <Activity size={20} />,
      color: "text-et-green",
    },
    {
      id: "emission",
      label: "Emisi",
      unit: "kgCO2",
      icon: <Leaf size={20} />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <StatCard
            key={m.id}
            {...m}
            // Gunakan .toLocaleString agar angka ribuan ada titiknya
            value={liveValues[m.id].toLocaleString("id-ID")}
            trend={activeTab === "Realtime" ? trends[m.id] : getSubLabel(m.id)}
            isActive={activeMetric === m.id}
            onClick={() => setActiveMetric(m.id)}
            // Kita modifikasi StatCard sedikit untuk menerima warna trend yang berbeda jika history
            isHistory={activeTab !== "Realtime"}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Chart Container */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white capitalize">
              {activeTab} {activeMetric} Monitoring
            </h3>
            <div className="flex items-center gap-2">
              {activeTab === "Realtime" ? (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Live Update
                  </span>
                </>
              ) : (
                <span className="text-[10px] font-bold text-et-blue uppercase">
                  Historical Data
                </span>
              )}
            </div>
          </div>
          <div className="h-64 rounded-2xl">
            {/* Chart tetap menerima latestValue, Recharts akan otomatis berhenti bergerak jika value tidak berubah */}
            <RealtimeLoadChart
              activeMetric={activeMetric}
              latestValue={liveValues[activeMetric]}
              activeTab={activeTab} // Kirim activeTab
              historyData={historyChartData[activeTab]} // Kirim data array history
            />
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          {/* Power Quality - Dibuat lebih ringkas */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
              Power Quality
            </h3>
            <div className="flex flex-col items-center py-1">
              <div
                className={`text-4xl font-black tracking-tighter transition-colors duration-500 ${
                  powerQuality < 0.96 ? "text-et-yellow" : "text-et-green"
                }`}
              >
                {powerQuality}
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                Power Factor (Cos Phi)
              </p>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    powerQuality < 0.96 ? "bg-et-yellow" : "bg-et-green"
                  }`}
                  style={{ width: `${powerQuality * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Recent Alerts - Diberikan Scrollbar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-[175px]">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">
              Recent Alerts
            </h3>

            {/* Container Scrollable */}
            <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex gap-4 items-start animate-in slide-in-from-right-4 duration-300 border-b border-slate-50 dark:border-slate-800/50 pb-3 last:border-0"
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        alert.type === "warning"
                          ? "bg-orange-100 text-orange-600 dark:bg-orange-500/10"
                          : alert.type === "danger"
                          ? "bg-red-100 text-red-600 dark:bg-red-500/10"
                          : "bg-green-100 text-green-600 dark:bg-green-500/10"
                      }`}
                    >
                      {alert.type === "success" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <AlertTriangle size={16} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                          {alert.title}
                        </p>
                        <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 break-words">
                        {alert.msg}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs italic">
                  Belum ada aktivitas terdeteksi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
