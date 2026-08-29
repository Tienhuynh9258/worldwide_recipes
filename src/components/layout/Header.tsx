"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChefHat, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'glass-strong shadow-xl border-border/30'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <ChefHat className="w-6 h-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-xl md:text-2xl font-headline font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            Global Gastronomy Guide
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Search', id: 'hero-search-bar' },
            { label: 'Filters', id: 'filter-section' },
            { label: 'Trending', id: 'trending-section' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border/20 animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Search', id: 'hero-search-bar' },
              { label: 'Filters', id: 'filter-section' },
              { label: 'Trending', id: 'trending-section' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/40 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
