"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme, Font } from "@/types/settingTypes";

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
  //초기값을 localStorage에서 가져와서 설정 (서버 사이드 문제 방지)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || initialTheme;
    }
    return initialTheme;
  });

  const [font, setFont] = useState<Font>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("font") as Font) || initialFont;
    }
    return initialFont;
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("fontSize")) || initialFontSize;
    }
    return initialFontSize;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // useEffect에서 localStorage값 한 번 더 설정 (CSR 환경 반영)
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
      setIsInitialized(true);
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

  // 초기화가 완료될 때까지 숨김 처리하여 깜빡임 방지
  if (!isInitialized) {
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

// useTheme() 훅 ThemeProvider 내부에서만 사용되도록 보장
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    if (typeof window !== "undefined") {
      console.warn("ThemeProvider가 없어서 기본값을 반환합니다.");
      return {
        theme: "sky",
        setTheme: () => {},
        font: "suit",
        setFont: () => {},
        fontSize: 16,
        setFontSize: () => {},
      };
    }
    return {
      theme: "sky",
      setTheme: () => {
        throw new Error(
          "useTheme 훅은 ThemeProvider 내부에서만 사용해야 합니다."
        );
      },
      font: "suit",
      setFont: () => {
        throw new Error(
          "useTheme 훅은 ThemeProvider 내부에서만 사용해야 합니다."
        );
      },
      fontSize: 16,
      setFontSize: () => {
        throw new Error(
          "useTheme 훅은 ThemeProvider 내부에서만 사용해야 합니다."
        );
      },
    };
  }
  return context;
}
