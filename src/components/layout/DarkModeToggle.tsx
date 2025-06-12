import { useEffect, useState } from 'react';
import { ChefHat, Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check system or saved preference
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

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleDark}
      className="fixed top-6 right-6 z-50 bg-card/80 dark:bg-background/80 border border-border/40 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      tabIndex={0}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span className="relative flex items-center justify-center w-7 h-7">
        <ChefHat className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} text-primary`} size={22} />
        <Sun className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} text-accent`} size={22} />
        <Moon className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} text-accent`} size={22} />
      </span>
    </button>
  );
} 