import { createContext, useContext, useEffect, useState } from "react";
import { themes } from "../utils/themes";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "blue"
);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", themes[theme].accent);
     root.style.setProperty("--accent-hover", themes[theme].hover);

     localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
