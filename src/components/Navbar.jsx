import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Bell,
  UserCircle,
  Search,
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
  Zap,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const Navbar = ({ isDarkMode, toggleDarkMode, onLogout }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Deteksi Title dari URL secara otomatis
  const currentPath = location.pathname.split("/").filter(Boolean).pop();
  const title =
    currentPath === "dashboard" || !currentPath ? "overview" : currentPath;

  // Data Dummy Notifikasi
  const notifications = [
    {
      id: 1,
      title: "Tegangan Tinggi Terdeteksi",
      desc: "Fasa R mencapai 242V di Panel Utama",
      time: "2 menit yang lalu",
      icon: <AlertTriangle className="text-red-500" size={16} />,
      isRead: false,
    },
    {
      id: 2,
      title: "Target Hemat Tercapai",
      desc: "Selamat! Efisiensi naik 5% minggu ini",
      time: "1 jam yang lalu",
      icon: <CheckCircle2 className="text-et-green" size={16} />,
      isRead: false,
    },
    {
      id: 3,
      title: "Maintenance Sistem",
      desc: "Update firmware sensor berhasil",
      time: "3 jam yang lalu",
      icon: <Zap className="text-et-blue" size={16} />,
      isRead: true,
    },
  ];

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target))
        setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target))
        setIsNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 px-8 flex items-center justify-between transition-colors">
      <h2 className="text-2xl font-bold text-et-dark dark:text-white capitalize">
        {title === "overview" ? "Dashboard Overview" : title.replace("-", " ")}
      </h2>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group hidden md:block">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search data..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 ring-et-blue/20 w-64 transition-all text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              className={`relative p-2.5 rounded-xl transition-all active:scale-95 ${
                isNotifOpen
                  ? "bg-et-blue/10 text-et-blue"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">
                    Notifikasi
                  </p>
                  <button className="text-[10px] font-bold text-et-blue hover:underline">
                    Tandai dibaca
                  </button>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        !n.isRead ? "bg-et-blue/5" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          {n.icon}
                        </div>
                        <div className="space-y-1">
                          <p
                            className={`text-xs font-bold leading-tight ${
                              !n.isRead
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                            {n.desc}
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-et-blue uppercase tracking-widest transition-colors border-t border-slate-50 dark:border-slate-800">
                  Lihat Semua
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800 dark:text-white group-hover:text-et-blue transition-colors">
                Admin
              </p>
              <p className="text-[10px] text-et-green font-bold tracking-widest uppercase">
                Superuser
              </p>
            </div>
            <UserCircle
              size={38}
              className="text-slate-300 dark:text-slate-600 group-hover:text-et-blue transition-colors"
            />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 mb-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  Account
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate mt-1">
                  admin@energitimur.id
                </p>
              </div>
              <DropdownItem icon={<User size={16} />} label="Profil Saya" />
              <DropdownItem
                icon={<Settings size={16} />}
                label="Pengaturan Akun"
              />
              <div className="border-t border-slate-50 dark:border-slate-800 mt-2 pt-2">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <span className="text-slate-400">{icon}</span> {label}
  </button>
);

export default Navbar;
