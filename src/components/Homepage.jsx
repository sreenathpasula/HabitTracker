import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Zap,
  Shield,
  ArrowRight,
  Heart,
  Sun,
  Moon,
  TrendingUp,
} from "lucide-react";

const Homepage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gml_theme");
    if (savedTheme !== null) return savedTheme === "dark";
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  useEffect(() => {
    localStorage.setItem("gml_theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = {
    bg: isDarkMode ? "bg-[#191919] text-[#E3E3E3]" : "bg-white text-[#37352f]",
    gridTexture: {
      backgroundImage: `linear-gradient(${
        isDarkMode ? "#2F2F2F" : "#e5e7eb"
      } 1px, transparent 1px), 
                        linear-gradient(90deg, ${
                          isDarkMode ? "#2F2F2F" : "#e5e7eb"
                        } 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      backgroundPosition: "center center",
    },
    card: isDarkMode
      ? "bg-[#202020]/80 backdrop-blur-sm border-[#2F2F2F]"
      : "bg-white/80 backdrop-blur-sm border-gray-200",
    input: isDarkMode ? "bg-[#2F2F2F]" : "bg-[#f1f1ef]",
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-500",
    border: isDarkMode ? "border-[#2F2F2F]" : "border-gray-100",
    navBtn: isDarkMode
      ? "bg-[#E3E3E3] text-[#191919]"
      : "bg-[#37352f] text-white",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${theme.bg} relative overflow-hidden`}
    >
      {/* Grid Texture Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={theme.gridTexture}
      />

      {/* Aligned Wrapper: p-4 md:p-12 */}
      <div className="relative z-10 p-2 md:p-10">
        {/* Navigation - Aligned: mb-8, pb-4, gap-4 */}
        <nav
          className={`max-w-7xl mx-auto mb-8 flex flex-row items-center justify-between border-b pb-4 gap-4 ${theme.border}`}
        >
          <div className="text-xl font-bold tracking-tight">GridMyLife</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all ${theme.input} hover:opacity-80`}
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
            </button>
            <Link
              to="/dashboard"
              className={`${theme.navBtn} px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              Launch App
            </Link>
          </div>
        </nav>

        {/* Hero Section - Aligned: mb-10 */}
        <header className="max-w-4xl mx-auto text-center py-10 px-6 mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Master your habits, <br />
            <span className="text-green-600">one grid at a time.</span>
          </h1>
          <p
            className={`text-xl ${theme.textSecondary} mb-10 max-w-2xl mx-auto`}
          >
            A minimalist habit tracker designed to help you visualize
            consistency and get 1% better every single day.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-green-700 transition-all shadow-sm shadow-green-200"
          >
            Start Tracking for Free <ArrowRight size={20} />
          </Link>
        </header>

        {/* Philosophy Section - The 1% Rule */}
        <section
          className={`max-w-7xl mx-auto mb-10 border-t ${theme.border} pt-12`}
        >
          <div
            className={`p-8 md:p-12 rounded-3xl border ${theme.card} relative overflow-hidden`}
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={120} />
            </div>

            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                The Power of Atomic Habits
              </h2>
              <p
                className={`${theme.textSecondary} text-lg leading-relaxed mb-6`}
              >
                As James Clear explains, the most powerful outcomes are the
                result of small, consistent actions. We often convince ourselves
                that massive success requires massive action, but improvement is
                actually a game of marginal gains.
              </p>

              <div className="flex flex-col md:flex-row items-center gap-8 bg-blue-500/5 p-6 rounded-2xl border border-blue-500/20">
                <div className="text-center md:text-left"></div>
                <div
                  className={`h-px w-full md:w-px md:h-12 ${theme.border}`}
                ></div>
                <p className="text-sm leading-relaxed opacity-80">
                  If you can get just 1% better each day for one year, you’ll
                  end up{" "}
                  <span className="font-bold text-blue-500">
                    thirty-seven times better
                  </span>{" "}
                  by the time you’re done.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid - Aligned: gap-6, p-6 */}
        <section
          className={`max-w-7xl mx-auto mb-10 border-t ${theme.border} pt-12`}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-500">
            <Zap size={20} />
            <span className={isDarkMode ? "text-white" : "text-gray-800"}>
              Platform Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                color: "text-blue-600",
                bg: "bg-blue-500/10",
                title: "Visual Momentum",
                desc: "Our 31-day grid dashboard gives you an instant bird's-eye view of your consistency.",
              },
              {
                icon: CheckCircle,
                color: "text-green-600",
                bg: "bg-green-500/10",
                title: "Smart Insights",
                desc: "Automatic completion rates and performance summaries identify where to focus.",
              },
              {
                icon: Shield,
                color: "text-purple-600",
                bg: "bg-purple-500/10",
                title: "Privacy First",
                desc: "Your data stays with you. We use local storage to ensure your habits are private.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border ${theme.card} space-y-4 shadow-sm`}
              >
                <div
                  className={`w-12 h-12 ${f.bg} flex items-center justify-center rounded-2xl`}
                >
                  <f.icon className={f.color} size={24} />
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className={`${theme.textSecondary} leading-relaxed text-sm`}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section - Aligned: mb-10, border-t, pt-12 */}
        <footer
          className={`max-w-7xl mx-auto text-center border-t ${theme.border} pt-12 pb-10 mb-10`}
        >
          <p className="text-sm opacity-50 mb-1">GridMyLife</p>
          <p className={`text-sm opacity-80`}>
            Created with{" "}
            <Heart size={18} className="inline-block text-red-500" /> by{" "}
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
    </div>
  );
};

export default Homepage;
