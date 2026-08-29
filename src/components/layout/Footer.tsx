"use client";

import { ChefHat, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/30 bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <ChefHat className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Global Gastronomy Guide
              </p>
              <p className="text-xs text-muted-foreground">
                Discover authentic recipes from around the world.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for culinary explorers.
          </p>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Global Gastronomy Guide. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full glass shadow-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
