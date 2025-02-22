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
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: Theme;
  initialFont: Font;
}

export function ThemeProvider({
  children,
  initialTheme,
  initialFont,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [font, setFont] = useState<Font>(initialFont);

  // 브라우저 환경에서만 실행되도록 localStorage 값 불러오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      const savedFont = localStorage.getItem("font") as Font;

      if (savedTheme) setTheme(savedTheme);
      if (savedFont) setFont(savedFont);
    }
  }, []);

  // 테마 변경 : data-theme 속성 업데이트 , localStorage 저장
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // 폰트 변경 : data-font 속성 업데이트 , 로컬에 저장
  useEffect(() => {
    document.documentElement.setAttribute("data-font", font);
    if (typeof window !== "undefined") {
      localStorage.setItem("font", font);
    }
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme 훅은 ThemeProvider 내부에서만 사용해야 합니다.");
  return context;
}

export default ThemeContext;
