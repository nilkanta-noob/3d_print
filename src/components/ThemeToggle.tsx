"use client";

import React, { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { THEME_STORAGE_KEY, type Theme } from './theme';

const THEME_CHANGE_EVENT = 'pw-themechange';

// The theme lives on <html data-theme> (set before paint by the inline script in layout.tsx), so read it from there.
function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function subscribe(onChange: () => void) {
  // Follow a change made in another open tab
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
      document.documentElement.dataset.theme = event.newValue;
      onChange();
    }
  };
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export default function ThemeToggle() {
  // null during server render and hydration: the saved theme is only known in the browser
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);
  const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';

  const toggleTheme = () => {
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Storage unavailable (private mode, blocked site data) — the theme still applies for this visit
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="inline-flex size-8.5 items-center justify-center rounded-md border border-border text-text-secondary transition-colors duration-200 hover:border-text-primary/40 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
