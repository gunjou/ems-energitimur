import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./views/Login";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Inisialisasi state langsung dari localStorage agar tidak ada "flicker"
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Alur Login */}
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Alur Dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Redirect Root ke Login atau Dashboard */}
          <Route
            path="/dashboard/*" // Perhatikan tanda '*' untuk nested routes
            element={
              isLoggedIn ? (
                <Dashboard
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
