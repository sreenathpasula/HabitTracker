import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  // --- Theme State (Synced with Tracker, Homepage, and Footer) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gml_theme");
    if (savedTheme !== null) return savedTheme === "dark";
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem("gml_theme", isDarkMode ? "dark" : "light");
    // Trigger a storage event so other components (like Footer) can update
    window.dispatchEvent(new Event("storage"));
  }, [isDarkMode]);

  // --- Theme Configuration ---
  const theme = {
    input: isDarkMode ? "bg-[#2F2F2F]" : "bg-[#f1f1ef]",
    navBtn: isDarkMode
      ? "bg-[#E3E3E3] text-[#191919]"
      : "bg-[#37352f] text-white",
    text: isDarkMode ? "text-[#E3E3E3]" : "text-[#37352f]",
  };

  return (
    <nav
      className={`max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20 ${theme.text}`}
    >
      <Link
        to="/"
        className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
      >
        GridMyLife
      </Link>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full transition-all ${theme.input} hover:opacity-80`}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-indigo-600" />
          )}
        </button>

        <Link
          to="/tracker"
          className={`${theme.navBtn} px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity`}
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
