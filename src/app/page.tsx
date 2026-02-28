"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Mic, ImageUp, AlertTriangle, Search, ChefHat, ListFilter, Palette, Utensils } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import DarkModeToggle from '@/components/layout/DarkModeToggle';
import ScrollToTop from '@/components/ui/scroll-to-top';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCookingTime, setSelectedCookingTime] = useState('any');

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);


  useEffect(() => {
    setIsLoadingRecipes(true);
    // Simulate API call
    setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoadingRecipes(false);
    }, 500);
  }, []);

  const handleHeroSearch = () => {
    // Scroll to results if needed, or simply let the page re-render
    const recipeSection = document.getElementById('recipe-listing-section');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Text search logic
      const searchMatch = !searchQuery.trim() || 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Cooking time filter logic
      let totalMinutes = 0;
      const getMinutes = (str?: string) => {
        if (!str) return 0;
        const match = str.match(/\d+/g);
        if (!match) return 0;
        return Math.max(...match.map(Number));
      };
      totalMinutes += getMinutes(recipe.prepTime);
      totalMinutes += getMinutes(recipe.cookTime);
      let cookingTimeMatch = true;
      if (selectedCookingTime !== 'any') {
        if (selectedCookingTime === 'under-15') cookingTimeMatch = totalMinutes < 15;
        else if (selectedCookingTime === '15-30') cookingTimeMatch = totalMinutes >= 15 && totalMinutes <= 30;
        else if (selectedCookingTime === '30-60') cookingTimeMatch = totalMinutes > 30 && totalMinutes <= 60;
        else if (selectedCookingTime === 'over-60') cookingTimeMatch = totalMinutes > 60;
      }
      
      // Other filter logic
      const regionMatch = selectedRegion ? recipe.region === selectedRegion : true;
      const countryMatch = selectedCountry ? recipe.country === selectedCountry : true;
      const ingredientMatch = selectedIngredients.length > 0
        ? selectedIngredients.every(selIng =>
            recipe.ingredients.some(ing => ing.name.toLowerCase() === selIng.toLowerCase())
          )
        : true;
      
      return searchMatch && cookingTimeMatch && regionMatch && countryMatch && ingredientMatch;
    });
  }, [recipes, searchQuery, selectedCookingTime, selectedRegion, selectedCountry, selectedIngredients]);

  const handleAiRecipeSelect = (recipeName: string) => {
    // Scroll to results if needed, or simply let the page re-render
    const recipeSection = document.getElementById('recipe-listing-section');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      <DarkModeToggle />
      <section
        className="relative text-center py-16 md:py-32 bg-kitchen-gradient rounded-xl shadow-spice overflow-hidden border-2 border-spice-orange/20"
      >
        {/* Dynamic Food Collage Background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-transparent" />
          <Image 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
            alt="World cuisine collage" 
            fill 
            className="object-cover opacity-60" 
            priority 
          />
          {/* Additional layered food images for depth */}
                     <div className="absolute top-0 left-0 w-1/3 h-1/2 opacity-40">
             <Image 
               src="https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80" 
               alt="Tacos" 
               fill 
               className="object-cover rounded-full transform rotate-12 animate-float" 
             />
           </div>
          <div className="absolute top-1/4 right-0 w-1/4 h-1/3 opacity-40">
            <Image 
              src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80" 
              alt="Sushi" 
              fill 
              className="object-cover rounded-full transform -rotate-12 animate-float-delay" 
            />
          </div>
          <div className="absolute bottom-1/4 left-1/4 w-1/5 h-1/4 opacity-40">
            <Image 
              src="https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80" 
              alt="Pasta" 
              fill 
              className="object-cover rounded-full transform rotate-45 animate-float-slow" 
            />
          </div>
        </div>

        {/* Floating Ingredient Animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating Spices */}
          <div className="absolute top-10 left-10 text-4xl animate-float opacity-60">🌶️</div>
          <div className="absolute top-20 right-20 text-3xl animate-float-delay opacity-50">🧄</div>
          <div className="absolute top-1/3 left-1/4 text-2xl animate-float-slow opacity-40">🧅</div>
          <div className="absolute bottom-1/3 right-1/3 text-3xl animate-float opacity-55">🍅</div>
          <div className="absolute bottom-20 left-20 text-2xl animate-float-delay opacity-45">🥕</div>
          <div className="absolute top-1/2 right-10 text-4xl animate-float-slow opacity-60">🌿</div>
          <div className="absolute bottom-1/4 left-1/3 text-3xl animate-float opacity-50">🫒</div>

          {/* Floating Cooking Tools */}
          <div className="absolute top-1/4 left-10 text-3xl animate-spin-slow opacity-30">🥄</div>
          <div className="absolute bottom-1/2 right-20 text-2xl animate-bounce-slow opacity-35">🍴</div>
        </div>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Steam effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-steam opacity-20" />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          {/* Enhanced Chef Hat with cooking effects */}
          <div className="relative mb-4 md:mb-6">
            <ChefHat className="mx-auto h-16 md:h-20 w-16 md:w-20 text-white opacity-90 transform transition-transform duration-500 hover:scale-110 animate-steam drop-shadow-2xl" />
            {/* Steam particles around chef hat */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1 opacity-60">
                <div className="w-1 h-1 bg-white/60 rounded-full animate-steam"></div>
                <div className="w-1 h-1 bg-white/40 rounded-full animate-steam" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1 h-1 bg-white/60 rounded-full animate-steam" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          <h1 className="text-hero font-headline text-white mb-6 md:mb-8 drop-shadow-2xl relative px-2 md:px-0">
            <span className="relative z-10">Explore a World of Flavors</span>
            {/* Sparkle effects */}
            <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 text-lg md:text-2xl animate-pulse opacity-80">✨</div>
            <div className="absolute -bottom-1 md:-bottom-2 -left-1 md:-left-2 text-base md:text-xl animate-pulse opacity-60" style={{animationDelay: '0.5s'}}>🌟</div>
          </h1>

          <p className="text-body-xl text-white/90 mb-8 md:mb-12 max-w-4xl mx-auto drop-shadow-lg relative px-2 md:px-0">
            <span className="text-accent-script text-saffron-yellow">Discover authentic recipes</span> from every corner of the globe. 
            <span className="text-accent-script text-herb-green">Your culinary adventure</span> starts here.
            <span className="inline-block ml-2 text-xl md:text-2xl animate-bounce">🍽️</span>
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-8 md:mb-10">
            <div className="relative w-full group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent transition-colors duration-300 group-hover:text-spice-orange z-10">
                <Utensils size={22} />
              </span>
              <Input
                type="text"
                placeholder="Search for recipes (e.g., Pizza, Sushi, Tacos...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleHeroSearch()}
                className="flex-grow text-base py-3.5 pl-12 pr-5 h-14 bg-card/95 backdrop-blur-sm text-foreground focus:bg-card shadow-xl border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg transition-all duration-300 hover:shadow-2xl focus:scale-105 btn-interactive"
                aria-label="Search recipes"
              />
              {/* Search input glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-spice-orange/20 to-herb-green/20 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Real-time search feedback */}
              {searchQuery.trim() && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex items-center gap-2 text-sm text-spice-orange font-medium">
                    <div className="w-2 h-2 bg-herb-green rounded-full animate-pulse"></div>
                    <span className="animate-fade-in">
                      {filteredRecipes.length} found
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              size="lg" 
              onClick={handleHeroSearch} 
              className="bg-white hover:bg-cream-white text-spice-orange hover:text-tomato-red px-10 h-14 shadow-spice hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-base rounded-lg font-semibold animate-sizzle relative overflow-hidden group btn-interactive btn-ripple"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-yellow/20 to-tomato-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Search size={22} className="mr-2.5 relative z-10 group-hover:animate-pulse" /> 
              <span className="relative z-10">Search Recipes</span>
              <span className="ml-2 text-lg">🔍</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-5">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsVoiceModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white hover:text-cream-white border-white/30 backdrop-blur-sm shadow-herb hover:shadow-lg transition-all duration-300 h-11 md:h-12 text-sm md:text-base px-4 md:px-6 rounded-lg font-medium group relative overflow-hidden btn-interactive w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-herb-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Mic className="mr-2 text-herb-green relative z-10 group-hover:animate-pulse" /> 
              <span className="relative z-10">Search with Voice</span>
              <span className="ml-2 text-lg animate-bounce">🎤</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsImageModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white hover:text-cream-white border-white/30 backdrop-blur-sm shadow-herb hover:shadow-lg transition-all duration-300 h-11 md:h-12 text-sm md:text-base px-4 md:px-6 rounded-lg font-medium group relative overflow-hidden btn-interactive w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ImageUp className="mr-2 text-saffron-yellow relative z-10 group-hover:animate-pulse" /> 
              <span className="relative z-10">Search with Image</span>
              <span className="ml-2 text-lg animate-heartbeat">📷</span>
            </Button>
          </div>

          {/* Enhanced cooking tips floating banner */}
          <div className="mt-8 md:mt-12 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium shadow-lg animate-float-slow hover:scale-105 transition-transform duration-300 cursor-pointer group mx-2">
            <span className="text-base md:text-lg animate-wiggle">👨‍🍳</span>
            <span className="text-accent-script">Pro Tip:</span>
            <span className="hidden sm:inline">Use voice search while your hands are messy!</span>
            <span className="sm:hidden">Voice search = clean hands! 🙌</span>
            <span className="text-base md:text-lg animate-bounce group-hover:animate-heartbeat">💡</span>
          </div>
        </div>
      </section>

      <Separator className="my-16 bg-spice-orange/20" />

      <div id="filter-section" className="scroll-mt-20">
        <div className="bg-cream-gradient rounded-xl p-6 shadow-spice mb-8 border-2 border-spice-orange/10 flex flex-wrap gap-4 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-spice-orange/5 via-transparent to-herb-green/5 opacity-30 pointer-events-none" aria-hidden="true" />
          <RecipeFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCookingTime={selectedCookingTime}
            setSelectedCookingTime={setSelectedCookingTime}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            regions={commonRegions}
            countries={commonCountries}
            categorizedIngredients={categorizedIngredientsData}
          />
        </div>
      </div>

      <section className="trending-section container mx-auto px-4">
        <h2 className="text-headline-lg font-headline text-warm-gray mb-8 flex items-center gap-4 animate-slide-in-left">
          <Palette size={36} className="text-tomato-red animate-heartbeat" /> 
          <span>Trending Recipes</span>
          <span className="text-accent-script text-saffron-yellow animate-wiggle">Hot & Fresh 🔥</span>
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 trending-scroll">
          {isLoadingRecipes ? (
            Array.from({ length: 4 }, (_, index) => (
              <div key={`trending-skeleton-${index}`} className="min-w-[320px] max-w-xs flex-shrink-0">
                <LoadingSkeleton variant="recipe" count={1} />
              </div>
            ))
          ) : (
            recipes.slice(0, 6).map((recipe, index) => (
              <div 
                key={recipe.id} 
                className={`min-w-[320px] max-w-xs flex-shrink-0 animate-slide-in-up stagger-${index + 1} hover-glow`}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))
          )}
        </div>
      </section>

      <section id="recipe-listing-section" className="scroll-mt-20">
        <div className="flex justify-between items-center mb-8 animate-slide-in-up">
          <h2 className="text-headline-lg font-headline text-warm-gray flex items-center gap-4">
            <Palette size={36} className="text-herb-green animate-pulse-glow" />
            <span>
              {(searchQuery.trim() || selectedCookingTime || selectedRegion || selectedCountry || selectedIngredients.length > 0) ? "Filtered Recipes" : "Discover Recipes"}
            </span>
            <span className="text-accent-script text-spice-orange animate-bounce">Handpicked 👨‍🍳</span>
          </h2>
          {(searchQuery.trim() || selectedCookingTime || selectedRegion || selectedCountry || selectedIngredients.length > 0) && (
            <p className="text-sm text-muted-foreground animate-fade-in">Showing {filteredRecipes.length} matching recipes</p>
          )}
        </div>

        {isLoadingRecipes ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-cream-gradient px-6 py-3 rounded-full shadow-spice border-2 border-spice-orange/20 animate-pulse">
                <div className="w-5 h-5 bg-spice-orange rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-herb-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-5 h-5 bg-saffron-yellow rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="text-warm-gray font-medium ml-2">Loading delicious recipes...</span>
                <span className="text-lg animate-bounce">🍳</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <LoadingSkeleton variant="recipe" count={6} />
            </div>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <div 
                key={recipe.id} 
                className={`animate-scale-in hover-glow stagger-${(index % 6) + 1}`}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cream-gradient rounded-xl shadow-spice border-2 border-spice-orange/20 animate-slide-in-up">
            <AlertTriangle className="mx-auto h-20 w-20 text-saffron-yellow mb-8 transform transition-transform duration-500 hover:rotate-12 animate-wiggle" />
            <h3 className="text-headline-md font-headline text-warm-gray mb-6">No Recipes Found! 🍳</h3>
            <p className="text-body-lg text-warm-gray/80 max-w-2xl mx-auto">
              We couldn't find any recipes matching your current filters. Try adjusting your search or broadening your criteria to discover more delicious dishes!
            </p>
          </div>
        )}
      </section>

      <VoiceSearchModal isOpen={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen} onRecipeSelect={() => {}} />
      <ImageSearchModal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen} onRecipeSelect={() => {}} />
      <ScrollToTop />
    </div>
  );
}
