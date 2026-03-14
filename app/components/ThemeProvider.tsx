// filepath: c:\Users\mohan\OneDrive\Desktop\jyoshna-website\app\components\ThemeProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
    document.documentElement.classList.toggle("dark");
  };
  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);