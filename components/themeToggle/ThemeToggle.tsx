"use client";

import { useState } from "react";
import { PiMoonStars, PiSun } from "react-icons/pi";

const themes = {
  light: "light",
  dark: "dark",
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="size-8 grid place-items-center rounded-md border border-gray-400 swap swap-rotate"
    >
      <PiSun className={`size-5 ${theme === themes.light ? "swap-on" : "swap-off"}`} />
      <PiMoonStars className={`size-5 ${theme === themes.dark ? "swap-on" : "swap-off"}`} />
    </button>
  );
};

export default ThemeToggle;
