"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { Mic, ImageUp, AlertTriangle, Search, ChefHat, ListFilter, Utensils, Flame, Compass, ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import DarkModeToggle from '@/components/layout/DarkModeToggle';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCookingTime, setSelectedCookingTime] = useState('any');

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  useEffect(() => {
    setIsLoadingRecipes(true);
    setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoadingRecipes(false);
    }, 500);
  }, []);

  const handleHeroSearch = () => {
    const recipeSection = document.getElementById('recipe-listing-section');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleVoiceSelect = (recipeName: string) => {
    setSearchQuery(recipeName);
  };

  const handleImageSelect = (recipeName: string) => {
    setSearchQuery(recipeName);
  };

  const ALL_REGIONS_PLACEHOLDER_VALUE = "__ALL_REGIONS_PLACEHOLDER__";
  const ALL_COUNTRIES_PLACEHOLDER_VALUE = "__ALL_COUNTRIES_PLACEHOLDER__";

  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description?.toLowerCase().includes(q) ?? false) ||
          r.region?.toLowerCase().includes(q) ||
          r.country?.toLowerCase().includes(q)
      );
    }

    if (selectedRegion && selectedRegion !== ALL_REGIONS_PLACEHOLDER_VALUE) {
      filtered = filtered.filter((r) => r.region === selectedRegion);
    }

    if (selectedCountry && selectedCountry !== ALL_COUNTRIES_PLACEHOLDER_VALUE) {
      filtered = filtered.filter((r) => r.country === selectedCountry);
    }

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        recipe.ingredients?.some((mainIng) => {
          const mainName = mainIng.name?.toLowerCase() || '';
          return selectedIngredients.some((si) => mainName.includes(si.toLowerCase()));
        })
      );
    }

    if (selectedCookingTime && selectedCookingTime !== 'any') {
      const maxTime = parseInt(selectedCookingTime, 10);
      filtered = filtered.filter((recipe) => {
        let timeMinutes = 0;
        if (recipe.prepTime) {
          const pMatch = recipe.prepTime.match(/(\d+)/);
          if (pMatch) timeMinutes += parseInt(pMatch[0], 10);
        }
        if (recipe.cookTime) {
          const cMatch = recipe.cookTime.match(/(\d+)/);
          if (cMatch) timeMinutes += parseInt(cMatch[0], 10);
        }
        if (maxTime === 121) {
          return timeMinutes >= 120;
        }
        return timeMinutes <= maxTime;
      });
    }

    return filtered;
  }, [recipes, searchQuery, selectedRegion, selectedCountry, selectedIngredients, selectedCookingTime]);

  const trendingRecipes = useMemo(() => {
    return recipes.length > 0 ? recipes.slice(0, 4) : [];
  }, [recipes]);

  return (
    <div className="min-h-screen bg-background relative">
      <DarkModeToggle />

      {/* ========== HERO SECTION ========== */}
      <section
        id="hero"
        className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40"
      >
        {/* Food background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80)",
          }}
        />
        {/* Dark gradient overlay for readability — warm culinary tones at top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-white/5 animate-float blur-2xl" />
          <div className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full bg-primary/10 animate-float blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-[20%] w-20 h-20 rounded-full bg-white/5 animate-float blur-2xl" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider animate-fade-in">
              <Flame size={14} />
              <span>Worldwide Recipe Discovery</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight animate-fade-in-up drop-shadow-lg">
              Discover{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300">Extraordinary</span>
              <br />
              Recipes from Around the Globe
            </h1>

            <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              Embark on a culinary journey. Search by ingredients, explore by region, or use our AI-powered voice and image search to find the perfect dish.
            </p>

            {/* Search bar */}
            <div id="hero-search-bar" className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground/60" />
                </div>
                <Input
                  type="text"
                  placeholder="Search recipes, cuisines, ingredients..."
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  className="w-full h-14 pl-11 pr-32 rounded-2xl text-base bg-card shadow-lg border-0 ring-1 ring-border/40 focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
                />
                <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-1.5">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => setIsVoiceModalOpen(true)}
                    aria-label="Search by voice"
                  >
                    <Mic size={18} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => setIsImageModalOpen(true)}
                    aria-label="Search by image"
                  >
                    <ImageUp size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats / trust indicators */}
            <div className="flex items-center justify-center gap-6 md:gap-10 pt-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 text-white/70">
                <Utensils size={16} className="text-amber-300/80" />
                <span className="text-sm">{recipes.length}+ Recipes</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <ChefHat size={16} className="text-amber-300/80" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Compass size={16} className="text-amber-300/80" />
                <span className="text-sm">Multi-Region</span>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="pt-4">
              <button
                onClick={handleHeroSearch}
                className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
              >
                <ArrowDown size={14} className="animate-bounce" />
                Explore below
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRENDING SECTION ========== */}
      {trendingRecipes.length > 0 && (
        <section id="trending-section" className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                <Flame size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
                  Trending Now
                </h2>
                <p className="text-sm text-muted-foreground">
                  Featured picks curated for you
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {trendingRecipes.map((recipe) => (
                <RecipeCard key={`featured-${recipe.id}`} recipe={recipe} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== MAIN LISTING ========== */}
      <Separator className="opacity-50" />

      <section id="recipe-listing-section" className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary">
              <Search size={18} className="text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
                Discover Recipes
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar rounded-2xl border border-border/40 bg-card/60 p-5 shadow-sm">
                <RecipeFilters
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
            </aside>

            {/* Recipe Grid */}
            <div className="flex-1 min-w-0">
              {isLoadingRecipes ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 rounded-2xl bg-muted/40 animate-pulse"
                    />
                  ))}
                </div>
              ) : filteredRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-2xl border border-dashed border-border/50 bg-muted/20">
                  <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mb-4">
                    <AlertTriangle size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    No recipes found
                  </h3>
                  <p className="text-muted-foreground max-w-sm mb-6">
                    Try adjusting your search or filters to discover more delicious recipes.
                  </p>
                  <Button
                    variant="default"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCookingTime('any');
                      setSelectedRegion(ALL_REGIONS_PLACEHOLDER_VALUE);
                      setSelectedCountry(ALL_COUNTRIES_PLACEHOLDER_VALUE);
                      setSelectedIngredients([]);
                    }}
                    className="rounded-xl"
                  >
                    <ListFilter size={16} className="mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <VoiceSearchModal
        isOpen={isVoiceModalOpen}
        onOpenChange={setIsVoiceModalOpen}
        onRecipeSelect={handleVoiceSelect}
      />
      <ImageSearchModal
        isOpen={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
        onRecipeSelect={handleImageSelect}
      />
    </div>
  );
}
