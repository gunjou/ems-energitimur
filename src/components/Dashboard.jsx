import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Clock } from "lucide-react";

// Import Halaman Menu
import Overview from "../views/Overview";
import EnergyAnalysis from "../views/EnergyAnalysis";
import CostForecast from "../views/CostForecast";
import Sustainability from "../views/Sustainability";
import PowerQuality from "../views/PowerQuality";
import Settings from "../views/Settings";

const Dashboard = ({ isDarkMode, toggleDarkMode, onLogout }) => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Realtime");

  // Mendapatkan activeMenu dari URL Path
  // Jika path adalah "/dashboard", maka menu-nya "overview"
  const currentPath = location.pathname.split("/").filter(Boolean).pop();
  const activeMenu = currentPath === "dashboard" ? "overview" : currentPath;

  // Logic Rule Tab: Sinkronkan tab saat pindah menu via URL
  useEffect(() => {
    // RULE 1: Jika masuk ke menu yang mendukung Realtime, paksa aktifkan tab Realtime
    if (activeMenu === "overview" || activeMenu === "power") {
      setActiveTab("Realtime");
    }
    // RULE 2: Jika masuk ke menu yang TIDAK mendukung Realtime (Energy, Cost, dll)
    // dan saat itu tab sedang di Realtime, paksa pindah ke Harian
    else if (activeTab === "Realtime") {
      setActiveTab("Harian");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]); // Hanya trigger saat menu berubah

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTitle = () => {
    const now = new Date();
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    switch (activeTab) {
      case "Harian":
        return `${now.getDate()} ${
          months[now.getMonth()]
        } ${now.getFullYear()}`;
      case "Bulanan":
        return `${months[now.getMonth()]} ${now.getFullYear()}`;
      case "Tahunan":
        return `${now.getFullYear()}`;
      default:
        return "Monitoring Real-time";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar sekarang mendeteksi activeMenu dari URL secara otomatis di dalamnya */}
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <Navbar
          title={activeMenu}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={onLogout}
        />

        <main className="p-8 space-y-4">
          {/* Header Filter tetap muncul kecuali di menu settings */}
          {activeMenu !== "settings" && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 animate-in fade-in duration-500">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                  {getTitle()}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                  <Clock size={14} /> Terakhir diperbarui:{" "}
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>

              {/* Filter Waktu - Rules tetap sama */}
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                {["Realtime", "Harian", "Bulanan", "Tahunan"]
                  .filter(
                    (tab) =>
                      activeMenu === "overview" ||
                      activeMenu === "power" ||
                      tab !== "Realtime"
                  )
                  .map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTab === tab
                          ? "bg-et-blue text-white shadow-md"
                          : "text-slate-500 dark:text-slate-400 hover:text-et-blue"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* ROUTING KONTEN DINAMIS */}
          <div className="mt-4">
            <Routes>
              <Route path="/" element={<Overview activeTab={activeTab} />} />
              <Route
                path="energy"
                element={<EnergyAnalysis activeTab={activeTab} />}
              />
              <Route
                path="cost"
                element={<CostForecast activeTab={activeTab} />}
              />
              <Route
                path="sustainability"
                element={<Sustainability activeTab={activeTab} />}
              />
              <Route
                path="power"
                element={<PowerQuality activeTab={activeTab} />}
              />
              <Route
                path="settings"
                element={<Settings activeTab={activeTab} />}
              />
              {/* Fallback jika path tidak dikenal */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
