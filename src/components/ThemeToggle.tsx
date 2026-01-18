"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("veritas-theme");
    const initialTheme = stored === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("veritas-theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="glass-surface flex items-center gap-2 px-4 py-2 text-xs font-semibold text-primary transition hover:opacity-90"
      aria-label="Toggle theme"
    >
      <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
      <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-800 [data-theme='dark']:bg-white/60 [data-theme='dark']:text-slate-800">
        Mode
      </span>
    </button>
  );
}
