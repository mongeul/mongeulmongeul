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
  const [theme, setTheme] = useState<Theme | null>(null);
  const [font, setFont] = useState<Font | null>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme =
        (localStorage.getItem("theme") as Theme) || initialTheme;
      const savedFont = (localStorage.getItem("font") as Font) || initialFont;
      const savedFontSize =
        Number(localStorage.getItem("fontSize")) || initialFontSize;

      setTheme(savedTheme);
      setFont(savedFont);
      setFontSize(savedFontSize);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (font) {
      document.documentElement.setAttribute("data-font", font);
      localStorage.setItem("font", font);
    }
  }, [font]);

  useEffect(() => {
    if (fontSize !== null) {
      document.documentElement.style.setProperty(
        "--font-size",
        `${fontSize}px`
      );
      localStorage.setItem("fontSize", fontSize.toString());
    }
  }, [fontSize]);

  if (theme === null || font === null || fontSize === null) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

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
