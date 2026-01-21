import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Plus,
  Trash2,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Target,
  Sun,
  Moon,
  Heart,
  Flame,
} from "lucide-react";

const Tracker = () => {
  // --- Audio & Theme Initialization ---
  const audioRef = useRef(new Audio("src/assets/Pop sound.mp3"));

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("gml_theme");
    if (savedTheme !== null) return savedTheme === "dark";
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  const [userName, setUserName] = useState(
    () => localStorage.getItem("gml_user") || "sreenath pasula"
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  // --- Dynamic Browser Title ---
  useEffect(() => {
    document.title = `${userName}'s Habit Tracker`;
  }, [userName]);

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("gml_habits");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Sleep 8hrs" }];
  });

  const [checkedData, setCheckedData] = useState(() => {
    const saved = localStorage.getItem("gml_checked");
    return saved ? JSON.parse(saved) : {};
  });

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem("gml_theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("gml_user", userName);
    localStorage.setItem("gml_habits", JSON.stringify(habits));
    localStorage.setItem("gml_checked", JSON.stringify(checkedData));
  }, [isDarkMode, userName, habits, checkedData]);

  const daysInMonth = useMemo(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
  }, [currentDate]);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // --- Handlers ---
  const toggleCheck = (habitId, day) => {
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const key = `${habitId}-${monthKey}-${day}`;

    if (!checkedData[key]) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setCheckedData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const insights = useMemo(() => {
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    let totalPossible = habits.length * daysInMonth;
    let habitStats = habits.map((h) => {
      let count = daysArray.filter(
        (d) => checkedData[`${h.id}-${monthKey}-${d}`]
      ).length;
      return {
        name: h.name,
        count,
        percent: Math.round((count / daysInMonth) * 100),
      };
    });
    let totalChecked = habitStats.reduce((acc, curr) => acc + curr.count, 0);
    const overallCompletion =
      totalPossible > 0 ? Math.round((totalChecked / totalPossible) * 100) : 0;
    const sortedStats = [...habitStats].sort((a, b) => b.count - a.count);
    return {
      overallCompletion,
      totalChecked,
      best: sortedStats[0] || { name: "None", percent: 0 },
    };
  }, [habits, checkedData, currentDate, daysInMonth]);

  const getDailyTotal = (day) => {
    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    return habits.filter((h) => checkedData[`${h.id}-${monthKey}-${day}`])
      .length;
  };

  const theme = {
    bg: isDarkMode ? "bg-[#191919] text-[#E3E3E3]" : "bg-white text-[#37352f]",
    card: isDarkMode
      ? "bg-[#202020] border-[#2F2F2F]"
      : "bg-white border-gray-200",
    header: isDarkMode
      ? "bg-[#252525] border-[#2F2F2F]"
      : "bg-[#f7f7f5] border-gray-200",
    input: isDarkMode ? "bg-[#2F2F2F]" : "bg-[#f1f1ef]",
    cellBorder: isDarkMode ? "border-[#2F2F2F]" : "border-gray-100",
    hover: isDarkMode ? "hover:bg-[#2F2F2F]" : "hover:bg-[#fbfbfa]",
    sticky: isDarkMode ? "bg-[#191919]" : "bg-white",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans p-4 md:p-12 ${theme.bg}`}
    >
      {/* 1. Header & Navigation */}
      <div
        className={`max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4 ${theme.cellBorder}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium ${theme.input}`}
          >
            <User size={14} />
            {isEditingName ? (
              <input
                autoFocus
                className="bg-transparent border-none focus:ring-0 p-0 w-32"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
              />
            ) : (
              <span
                onClick={() => setIsEditingName(true)}
                className="cursor-pointer"
              >
                {userName}
              </span>
            )}
          </div>

          {/* Manual Theme Toggle */}
          {/* <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-all ${theme.input} hover:opacity-80`}
          >
            {isDarkMode ? (
              <Sun size={16} className="text-yellow-400" />
            ) : (
              <Moon size={16} className="text-indigo-600" />
            )}
          </button> */}
        </div>

        <div
          className={`flex items-center gap-4 px-3 py-1 rounded-md ${theme.input}`}
        >
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold min-w-[120px] text-center">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <header className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">Habit Tracker</h1>
        <p className="opacity-60 italic text-sm md:text-base">
          "Getting 1% Better Each Day"
        </p>
      </header>

      {/* 2. Main Grid */}
      <main
        className={`max-w-7xl mx-auto overflow-x-auto shadow-sm rounded-lg border ${theme.card} mb-10`}
      >
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-collapse">
            <thead className={theme.header}>
              <tr>
                <th
                  className={`sticky left-0 z-20 p-4 text-left text-xs font-semibold uppercase border-r w-56 ${theme.header}`}
                >
                  Habits
                </th>
                {daysArray.map((day) => (
                  <th
                    key={day}
                    className={`p-2 text-center text-[10px] font-bold border-r min-w-[35px] ${theme.cellBorder}`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDarkMode ? "divide-[#2F2F2F]" : "divide-gray-200"
              }`}
            >
              {habits.map((habit) => (
                <tr key={habit.id} className={`group ${theme.hover}`}>
                  <td
                    className={`sticky left-0 z-10 p-2 border-r flex items-center gap-2 ${theme.sticky} ${theme.cellBorder}`}
                  >
                    <button
                      onClick={() =>
                        setHabits(habits.filter((h) => h.id !== habit.id))
                      }
                      className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                    <input
                      type="text"
                      value={habit.name}
                      onChange={(e) =>
                        setHabits(
                          habits.map((h) =>
                            h.id === habit.id
                              ? { ...h, name: e.target.value }
                              : h
                          )
                        )
                      }
                      className="bg-transparent border-none focus:ring-0 w-full text-sm"
                    />
                  </td>
                  {daysArray.map((day) => {
                    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
                    const isChecked =
                      checkedData[`${habit.id}-${monthKey}-${day}`];
                    return (
                      <td
                        key={day}
                        className={`p-0 border-r ${theme.cellBorder}`}
                      >
                        <div
                          onClick={() => toggleCheck(habit.id, day)}
                          className={`w-full h-10 flex items-center justify-center cursor-pointer ${
                            isChecked
                              ? isDarkMode
                                ? "bg-green-900/20"
                                : "bg-green-50"
                              : ""
                          }`}
                        >
                          {isChecked && (
                            <Flame size={16} className="text-green-500" />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className={`${theme.header} font-bold`}>
                <td
                  className={`sticky left-0 z-10 p-4 text-xs border-r uppercase ${theme.header}`}
                >
                  Total Points
                </td>
                {daysArray.map((day) => (
                  <td
                    key={day}
                    className={`p-2 text-center text-xs border-r ${theme.cellBorder}`}
                  >
                    {getDailyTotal(day) || ""}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* 3. Habit Insights */}
      <section className="max-w-7xl mx-auto mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-500">
          <TrendingUp size={20} />
          <span className={isDarkMode ? "text-white" : "text-gray-800"}>
            Habit Insights
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border ${theme.card}`}>
            <span className="text-sm opacity-60 flex justify-between">
              Completion Rate <Target size={18} className="text-blue-500" />
            </span>
            <div className="text-3xl font-bold mt-2">
              {insights.overallCompletion}%
            </div>
            <div className="mt-2 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${insights.overallCompletion}%` }}
              />
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${theme.card}`}>
            <span className="text-sm opacity-60 flex justify-between">
              Top Habit <Award size={18} className="text-yellow-500" />
            </span>
            <div className="text-xl font-bold truncate mt-2">
              {insights.best.name}
            </div>
            <div className="text-sm opacity-60">
              {insights.best.percent}% consistency this month
            </div>
          </div>
          <div className={`p-6 rounded-xl border ${theme.card}`}>
            <span className="text-sm opacity-60 flex justify-between">
              Monthly Effort{" "}
              <CheckCircle2 size={18} className="text-green-500" />
            </span>
            <div className="text-3xl font-bold mt-2">
              {insights.totalChecked}
            </div>
            <div className="text-sm opacity-60">
              Total habits completed in{" "}
              {currentDate.toLocaleString("default", { month: "long" })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer Section */}
      {/* <footer className="max-w-7xl mx-auto mb-10 pb-10">
        <p className="text-sm opacity-50 mb-1">GridMyLife</p>
        <p className={`text-sm opacity-80`}>
          Created with <Heart size={18} className="inline-block text-red-500" />{" "}
          by{" "}
          <a
            href="https://anshulwork.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anshul Gora
          </a>
        </p>
      </footer> */}

      {/* 5. Add New Habit Button */}
      <button
        onClick={() =>
          setHabits([...habits, { id: Date.now(), name: "New Habit" }])
        }
        className={`fixed bottom-8 right-8 flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 ${theme.input} font-bold border ${theme.cellBorder}`}
      >
        <Plus size={20} />
        New Habit
      </button>
    </div>
  );
};

export default Tracker;
