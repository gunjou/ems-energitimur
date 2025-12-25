import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import logoET from "../images/logo_energitimur.png";

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const isValid =
      ((email === "admin@energitimur.com" || email === "admin") &&
        password === "admin123") ||
      (email === "admin" && password === "admin");

    if (isValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000); // Delay sedikit lebih lama agar spinner terlihat elegan
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-et-blue/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* FULLSCREEN TRANSPARENT SPINNER OVERLAY */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-et-blue border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* LOGIN CARD */}
      <div
        className={`max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 pb-4 pt-2 rounded-[40px] shadow-2xl shadow-et-blue/10 border border-white relative overflow-hidden transition-all duration-700 ${
          isLoading ? "scale-90 opacity-0 blur-xl" : "scale-100 opacity-100"
        }`}
      >
        {/* Dekorasi Aksen (Tetap sama) */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-et-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-et-blue/5 rounded-full blur-3xl"></div>

        {/* Logo & Header Section (Tetap sama) */}
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-6 mt-4">
            <div className="w-28 h-28 p-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden flex items-center justify-center">
              <img
                src={logoET}
                alt="Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter leading-none uppercase">
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
          {/* Email & Password Fields (Sama seperti sebelumnya) */}
          <div className="space-y-4">
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
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 ring-et-blue/5 focus:bg-white focus:border-et-blue/20 transition-all"
                  placeholder="Username / Email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-et-blue transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
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

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center items-center py-4 px-4 text-sm font-black rounded-2xl text-white bg-et-blue hover:bg-et-dark shadow-xl shadow-et-blue/20 active:scale-[0.98] transition-all overflow-hidden"
          >
            LOG IN TO SYSTEM
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
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
