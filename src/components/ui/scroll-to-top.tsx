"use client";

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 p-0 rounded-full bg-spice-orange hover:bg-tomato-red text-white shadow-spice hover:shadow-xl transition-all duration-300 btn-interactive hover-glow animate-slide-in-up group safe-area-padding"
      aria-label="Scroll to top"
    >
      <ChevronUp 
        size={24} 
        className="group-hover:animate-bounce transition-transform duration-300 group-hover:scale-110" 
      />
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300" />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-spice-orange/20 blur-lg scale-0 group-hover:scale-150 transition-transform duration-500" />
    </Button>
  );
} 