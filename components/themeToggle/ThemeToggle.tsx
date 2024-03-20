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
      className="size-8 grid place-items-center rounded-md border border-gray-400/60 dark:border-gray-400/25 swap swap-rotate text-gray-500"
    >
      <PiSun className={`size-[22px] ${theme === themes.light ? "swap-on" : "swap-off"}`} />
      <PiMoonStars className={`size-[22px] ${theme === themes.dark ? "swap-on" : "swap-off"}`} />
    </button>
  );
};

export default ThemeToggle;
