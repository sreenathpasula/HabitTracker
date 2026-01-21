import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  // --- Theme State (Synced with Tracker & Homepage) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gml_theme");
    if (savedTheme !== null) return savedTheme === "dark";
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  // Listen for theme changes in localStorage (optional, for real-time updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem("gml_theme");
      setIsDarkMode(savedTheme === "dark");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- Theme Configuration ---
  const theme = {
    border: isDarkMode ? "border-[#2F2F2F]" : "border-gray-100",
    text: isDarkMode ? "text-[#E3E3E3]" : "text-[#37352f]",
  };

  return (
    <div>
      {/* Footer Section - Aligned: mb-10, border-t, pt-12 */}
      <footer
        className={`max-w-7xl mx-auto text-center border-t ${theme.border} pt-12 pb-10 mb-10`}
      >
        <p className="text-sm opacity-50 mb-1">GridMyLife</p>
        <p className={`text-sm opacity-80`}>
          Created with <Heart size={18} className="inline-block text-red-500" />{" "}
          by{" "}
          <a
            href="https://anshulwork.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors"
          >
            Anshul Gora
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
