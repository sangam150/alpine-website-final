"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface BrandThemeContextType {
  theme: "alpine" | "classic";
  toggleTheme: () => void;
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(
  undefined,
);

export function useBrandTheme() {
  const ctx = useContext(BrandThemeContext);
  if (!ctx)
    throw new Error("useBrandTheme must be used within BrandThemeProvider");
  return ctx;
}

export function BrandThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"alpine" | "classic">("alpine");

  useEffect(() => {
    if (theme === "alpine") {
      document.documentElement.style.setProperty("--color-primary", "#2563eb");
    } else {
      document.documentElement.style.setProperty("--color-primary", "#3b82f6"); // fallback/classic blue
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "alpine" ? "classic" : "alpine"));

  return (
    <BrandThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </BrandThemeContext.Provider>
  );
}
