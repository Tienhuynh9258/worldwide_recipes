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
      className="fixed bottom-4 left-4 md:top-6 md:right-6 md:bottom-auto md:left-auto z-50 bg-card/90 dark:bg-background/90 backdrop-blur-sm border border-border/50 rounded-full p-2.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:scale-110 active:scale-95"
      tabIndex={0}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7">
        <ChefHat className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} text-primary`} size={20} />
        <Sun className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} text-accent`} size={20} />
        <Moon className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} text-accent`} size={20} />
        
        {/* Mobile hint pulse effect */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping md:hidden opacity-20" style={{animationDuration: '3s'}} />
      </span>
    </button>
  );
} 