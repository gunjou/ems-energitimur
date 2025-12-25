import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Cpu,
  Database,
  Palette,
  Zap,
  Globe,
  Save,
  RefreshCcw,
} from "lucide-react";

const Settings = () => {
  // State sederhana untuk simulasi form
  const [config, setConfig] = useState({
    tariff: "1444",
    budget: "2500000",
    voltageLimit: "240",
    isEmailNotif: true,
    isWaNotif: false,
    updateInterval: "3",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-et-blue flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-et-blue/20">
            ET
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              Admin Energi Timur
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
              Industrial Plan • Account ID: #88219
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">
          <RefreshCcw size={14} /> Update Firmware
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Technical Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Electrical Params */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-et-yellow" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Konfigurasi Kelistrikan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Tarif Listrik (IDR/kWh)
                </label>
                <input
                  type="number"
                  name="tariff"
                  value={config.tariff}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-et-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Limit Anggaran (IDR)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={config.budget}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-et-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Threshold Overvoltage (V)
                </label>
                <input
                  type="number"
                  name="voltageLimit"
                  value={config.voltageLimit}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-et-blue transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">
                  Refresh Rate Realtime (Sec)
                </label>
                <select
                  name="updateInterval"
                  value={config.updateInterval}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl p-3 text-sm font-bold text-slate-800 dark:text-white"
                >
                  <option value="1">1 Detik (Fast)</option>
                  <option value="3">3 Detik (Normal)</option>
                  <option value="5">5 Detik (Eco)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section: IoT Device Status */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-et-blue" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Status Perangkat IoT
              </h3>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    ET-SENSOR-01 (Main Gate)
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    IP: 192.168.1.45 • Signal: Strong
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-[10px] font-bold">
                ONLINE
              </span>
            </div>
          </section>
        </div>

        {/* Right Column: Preferences & Security */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-et-green" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Notifikasi
              </h3>
            </div>
            <div className="space-y-4">
              <ToggleItem
                label="Email Alerts"
                desc="Kirim laporan harian ke email"
                name="isEmailNotif"
                checked={config.isEmailNotif}
                onChange={handleChange}
              />
              <ToggleItem
                label="WhatsApp Alerts"
                desc="Notifikasi instan saat anomali"
                name="isWaNotif"
                checked={config.isWaNotif}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-indigo-500" size={20} />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Data & Ekspor
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
              Unduh data historis lengkap dalam format spreadsheet untuk
              keperluan audit energi.
            </p>
            <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-bold hover:bg-et-blue hover:text-white transition-all">
              Export to .CSV
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 bg-et-blue dark:bg-white dark:text-et-blue text-white rounded-2xl font-black text-sm shadow-lg shadow-et-blue/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              <Save size={18} /> SIMPAN PERUBAHAN
            </button>
            <button className="w-full py-4 bg-white dark:bg-slate-900 text-red-500 rounded-2xl font-bold text-sm border border-red-100 dark:border-red-900/30">
              RESET KE DEFAULT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Toggle Component
const ToggleItem = ({ label, desc, name, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
        {label}
      </p>
      <p className="text-[10px] text-slate-400">{desc}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-et-green"></div>
    </label>
  </div>
);

export default Settings;
