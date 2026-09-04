import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'portfolio-theme-v2';
const THEME_TRANSITION_MS = 200;

let themeTransitionTimeout: number | undefined;

function startThemeTransition() {
  if (typeof window === 'undefined') {
    return;
  }

  window.clearTimeout(themeTransitionTimeout);
  document.documentElement.classList.add('is-theme-switching');
  themeTransitionTimeout = window.setTimeout(() => {
    document.documentElement.classList.remove('is-theme-switching');
  }, THEME_TRANSITION_MS);
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    startThemeTransition();
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggleTheme };
}
