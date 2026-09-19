// Shared by layout.tsx (server) and ThemeToggle (client) — keep this file free of "use client".

export type Theme = 'dark' | 'light';

export const DEFAULT_THEME: Theme = 'dark';

export const THEME_STORAGE_KEY = 'pw-theme';

// Runs in <head> before first paint: applies the saved theme so there's no flash of the default one.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
