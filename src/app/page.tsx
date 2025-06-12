"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { Mic, ImageUp, AlertTriangle, Search, ChefHat, ListFilter, Palette, Utensils } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
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
      const regionMatch = selectedRegion ? recipe.region === selectedRegion : true;
      const countryMatch = selectedCountry ? recipe.country === selectedCountry : true;
      const ingredientMatch = selectedIngredients.length > 0
        ? selectedIngredients.every(selIng =>
            recipe.ingredients.some(ing => ing.name.toLowerCase() === selIng.toLowerCase())
          )
        : true;
      return cookingTimeMatch && regionMatch && countryMatch && ingredientMatch;
    });
  }, [recipes, selectedCookingTime, selectedRegion, selectedCountry, selectedIngredients]);

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
        className="relative text-center py-20 md:py-32 bg-gradient-to-br from-primary/20 via-background to-accent/10 rounded-xl shadow-xl overflow-hidden border border-border/30"
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" alt="World cuisine collage" layout="fill" objectFit="cover" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-accent/20" />
        <div className="relative z-10 container mx-auto px-4">
          <ChefHat className="mx-auto h-20 w-20 text-primary mb-6 opacity-90 transform transition-transform duration-500 hover:scale-110" />
          <h1 className="text-5xl md:text-7xl font-headline text-foreground mb-8 leading-tight drop-shadow-lg">
            Explore a World of Flavors
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto">
            Discover authentic recipes from every corner of the globe. Your culinary adventure starts here.
          </p>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-10">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-accent">
                <Utensils size={22} />
              </span>
              <Input
                type="text"
                placeholder="Search for recipes (e.g., Pizza, Sushi, Tacos...)"
                value={''}
                onChange={(e) => {}}
                onKeyPress={(e) => e.key === 'Enter' && handleHeroSearch()}
                className="flex-grow text-base py-3.5 pl-12 pr-5 h-14 bg-card text-foreground focus:bg-card/90 shadow-lg border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg transition-all duration-200"
                aria-label="Search recipes"
              />
            </div>
            <Button size="lg" onClick={handleHeroSearch} className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-base rounded-lg">
              <Search size={22} className="mr-2.5" /> Search
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsVoiceModalOpen(true)}
              className="bg-card/70 hover:bg-card text-foreground hover:text-primary border-border/60 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base px-6 rounded-lg"
            >
              <Mic className="mr-2 text-primary/90" /> Search with Voice
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsImageModalOpen(true)}
              className="bg-card/70 hover:bg-card text-foreground hover:text-primary border-border/60 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base px-6 rounded-lg"
            >
              <ImageUp className="mr-2 text-primary/90" /> Search with Image
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-16 bg-border/40" />

      <div id="filter-section" className="scroll-mt-20">
        <div className="bg-secondary/40 rounded-xl p-6 shadow-md mb-8 border border-border/20 flex flex-wrap gap-4 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/spices-texture.png')] opacity-10 pointer-events-none" aria-hidden="true" />
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
      </div>

      <section className="trending-section container mx-auto px-4">
        <h2 className="text-3xl font-headline text-foreground mb-6 flex items-center gap-3">
          <Palette size={28} className="text-accent" /> Trending Recipes
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar">
          {recipes.slice(0, 6).map(recipe => (
            <div key={recipe.id} className="min-w-[320px] max-w-xs flex-shrink-0">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>

      <section id="recipe-listing-section" className="scroll-mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-headline text-foreground flex items-center">
            <Palette size={30} className="mr-3 text-accent" />
            {(selectedCookingTime || selectedRegion || selectedCountry || selectedIngredients.length > 0) ? "Filtered Recipes" : "Discover Recipes"}
          </h2>
          {(selectedCookingTime || selectedRegion || selectedCountry || selectedIngredients.length > 0) && (
            <p className="text-sm text-muted-foreground">Showing {filteredRecipes.length} matching recipes</p>
          )}
        </div>

        {isLoadingRecipes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card p-4 rounded-xl shadow-lg h-[450px] animate-pulse">
                  <div className="w-full h-60 bg-muted rounded-lg mb-4"></div>
                  <div className="w-3/4 h-8 bg-muted rounded mb-3"></div>
                  <div className="w-full h-6 bg-muted rounded mb-2"></div>
                  <div className="w-1/2 h-6 bg-muted rounded"></div>
                </div>
              ))}
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl shadow-lg border border-border/40">
            <AlertTriangle className="mx-auto h-20 w-20 text-accent mb-8 transform transition-transform duration-500 hover:rotate-12" />
            <h3 className="text-3xl font-semibold text-foreground mb-4">No Recipes Found</h3>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              We couldn't find any recipes matching your current filters. Try adjusting your search or broadening your criteria.
            </p>
          </div>
        )}
      </section>

      <VoiceSearchModal isOpen={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen} onRecipeSelect={() => {}} />
      <ImageSearchModal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen} onRecipeSelect={() => {}} />
    </div>
  );
}
