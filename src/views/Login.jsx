import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import logoET from "../images/logo_energitimur.png";

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (email === "admin@energitimur.com" || email === "admin") &&
      password === "admin123"
    ) {
      onLogin();
    } else if (email === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    // Menggunakan gradient halus dari tone logo Anda agar tidak putih polos
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-et-blue/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 pb-4 pt-2 rounded-[40px] shadow-2xl shadow-et-blue/10 border border-white relative overflow-hidden">
        {/* Dekorasi Aksen Warna Logo di Background Card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-et-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-et-blue/5 rounded-full blur-3xl"></div>

        {/* Logo & Header Section */}
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 p-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden flex items-center justify-center">
              {/* Logo diperbesar dan menggunakan object-cover untuk cropping otomatis yang rapi */}
              <img
                src={logoET}
                alt="Energi Timur Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">
              EMS
            </h2>
            <p className="text-xs font-bold text-et-blue uppercase tracking-[0.3em]">
              Energy Management System
            </p>
            <div className="h-1 w-12 bg-et-blue/20 mx-auto mt-4 rounded-full"></div>
            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tight">
              Energi Timur Nusa Power
            </p>
          </div>
        </div>

        <form className="mt-3 space-y-5 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Input Email / Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">
                Username / Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-et-blue transition-colors"
                  size={18}
                />
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 ring-et-blue/5 focus:bg-white focus:border-et-blue/20 transition-all"
                  placeholder="Username / Email"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">
                Security Key
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-et-blue transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-12 text-sm font-bold text-slate-700 outline-none focus:ring-4 ring-et-blue/5 focus:bg-white focus:border-et-blue/20 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-et-blue transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest p-4 rounded-2xl text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 group cursor-pointer">
              <input
                type="checkbox"
                className="rounded-md border-slate-200 text-et-blue focus:ring-et-blue w-4 h-4 transition-all"
              />
              <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-600">
                Remember Me
              </span>
            </div>
            <a
              href="#"
              className="text-[11px] font-bold text-et-blue hover:underline"
            >
              Need Help?
            </a>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center items-center py-4 px-4 text-sm font-black rounded-2xl text-white bg-et-blue hover:bg-et-dark shadow-xl shadow-et-blue/20 active:scale-[0.98] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative">LOG IN TO SYSTEM</span>
            <ArrowRight
              className="ml-2 relative group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-50">
          <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
            System Version 1.0.1
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
