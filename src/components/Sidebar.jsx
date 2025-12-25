import React from "react";
import { Link, useLocation } from "react-router-dom"; // Tambahkan ini
import MyLogo from "../images/logo_energitimur.png";
import {
  LayoutDashboard,
  Activity,
  Banknote,
  Leaf,
  Settings,
  History,
} from "lucide-react";

const Sidebar = () => {
  // Hapus props activeMenu & setActiveMenu
  const location = useLocation();

  // Logic untuk mendeteksi ID menu dari URL
  const currentPath = location.pathname.split("/").filter(Boolean).pop();
  const activeMenu =
    currentPath === "dashboard" || !currentPath ? "overview" : currentPath;

  const menus = [
    {
      id: "overview",
      name: "Overview",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      id: "power",
      name: "Power Quality",
      icon: <History size={20} />,
      path: "/dashboard/power",
    },
    {
      id: "energy",
      name: "Energy Analysis",
      icon: <Activity size={20} />,
      path: "/dashboard/energy",
    },
    {
      id: "cost",
      name: "Cost & Forecast",
      icon: <Banknote size={20} />,
      path: "/dashboard/cost",
    },
    {
      id: "sustainability",
      name: "Sustainability",
      icon: <Leaf size={20} />,
      path: "/dashboard/sustainability",
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-et-blue dark:bg-slate-900 text-white p-6 shadow-xl transition-all duration-300 z-30 flex flex-col">
      {/* Brand Logo Area - Tetap sama */}
      <div className="flex items-center gap-3 mb-10 px-1 group">
        <div className="relative shrink-0">
          <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src={MyLogo}
              alt="Logo"
              className="w-full h-full object-cover scale-125"
            />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h1 className="font-black text-[11px] text-white leading-tight uppercase">
            Energy Management <span className="text-et-yellow">System</span>
          </h1>
          <p className="text-[9px] text-blue-200/60 font-bold tracking-widest uppercase truncate">
            Energi Timur Nusa Power
          </p>
        </div>
      </div>

      {/* Navigation Menu - Berubah menjadi Link */}
      <nav className="space-y-1.5 flex-1">
        {menus.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeMenu === item.id
                ? "bg-white text-et-blue shadow-lg translate-x-1"
                : "text-blue-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={activeMenu === item.id ? "text-et-blue" : "opacity-70"}
            >
              {item.icon}
            </span>
            <span
              className={`text-sm tracking-wide ${
                activeMenu === item.id ? "font-black" : "font-semibold"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer Sidebar - Tetap sama */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="bg-black/20 rounded-xl p-3 flex items-center justify-between">
          <span className="text-[10px] font-bold text-blue-200/50 uppercase">
            Server
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold">ONLINE</span>
            <div className="w-2 h-2 bg-et-green rounded-full animate-pulse shadow-[0_0_8px_rgba(67,130,65,0.8)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
