"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

type Theme = "sky" | "amber" | "lime" | "pink" | "stone";
type Font = "suit" | "gowun-dodum";

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    Cookies.set("theme", theme, { expires: 365, path: "/" });
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-font", font);
    Cookies.set("font", font, { expires: 365, path: "/" });
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
