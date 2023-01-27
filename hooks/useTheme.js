import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  // Change theme to dark or light
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Set theme on page load
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    console.log(localTheme);
    setTheme(localTheme === "dark" ? "dark" : "light");
  }, []);

  // Save selected theme to local storage and add tailwind dark class
  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return { theme, toggleTheme };
}
