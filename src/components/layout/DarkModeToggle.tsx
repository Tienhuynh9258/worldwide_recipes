"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleDark}
      className="fixed top-5 right-5 z-50 w-10 h-10 rounded-full glass shadow-md border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      tabIndex={0}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span className="relative flex items-center justify-center w-5 h-5">
        <Sun
          className={`absolute transition-all duration-300 ${
            isDark ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'
          } text-primary`}
          size={20}
        />
        <Moon
          className={`absolute transition-all duration-300 ${
            isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
          } text-accent`}
          size={20}
        />
      </span>
    </button>
  );
}
