"use client";

import { Theme, Font } from "@/types/settingTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: Theme;
  initialFont: Font;
  initialFontSize: number;
}

export function ThemeProvider({
  children,
  initialTheme,
  initialFont,
  initialFontSize,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [font, setFont] = useState<Font>(initialFont);
  const [fontSize, setFontSize] = useState<number>(initialFontSize);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      const savedFont = localStorage.getItem("font") as Font;
      const savedFontSize = Number(localStorage.getItem("fontSize"));

      if (savedTheme) setTheme(savedTheme);
      if (savedFont) setFont(savedFont);
      if (!isNaN(savedFontSize)) setFontSize(savedFontSize);
    }
  }, []);

  // 테마 변경
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // 폰트 변경
  useEffect(() => {
    document.documentElement.setAttribute("data-font", font);
    if (typeof window !== "undefined") {
      localStorage.setItem("font", font);
    }
  }, [font]);

  // 폰트 크기 변경
  useEffect(() => {
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", fontSize.toString());
    }
  }, [fontSize]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, font, setFont, fontSize, setFontSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme 훅은 ThemeProvider 내부에서만 사용해야 합니다.");
  }
  return context;
}
