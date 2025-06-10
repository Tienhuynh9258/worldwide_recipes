
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { Mic, ImageUp, AlertTriangle, Search, ChefHat, ListFilter, Palette } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [heroSearchTerm, setHeroSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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
    setSearchTerm(heroSearchTerm);
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
    // Scroll to results if needed, or simply let the page re-render
    const recipeSection = document.getElementById('recipe-listing-section');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const nameMatch = searchTerm === '' ? true : recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const regionMatch = selectedRegion ? recipe.region === selectedRegion : true;
      const countryMatch = selectedCountry ? recipe.country === selectedCountry : true;
      const ingredientMatch = selectedIngredients.length > 0
        ? selectedIngredients.every(selIng =>
            recipe.ingredients.some(ing => ing.name.toLowerCase() === selIng.toLowerCase())
          )
        : true;

      return nameMatch && regionMatch && countryMatch && ingredientMatch;
    });
  }, [recipes, searchTerm, selectedRegion, selectedCountry, selectedIngredients]);

  const handleAiRecipeSelect = (recipeName: string) => {
    setSearchTerm(recipeName);
    setHeroSearchTerm(recipeName);
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
     const recipeSection = document.getElementById('recipe-listing-section');
    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      <section
        className="relative text-center py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5 rounded-xl shadow-xl overflow-hidden border border-border/30"
      >
        <div className="absolute inset-0 opacity-10">
           <Image src="https://placehold.co/1600x800.png" alt="Abstract culinary background" layout="fill" objectFit="cover" data-ai-hint="abstract food pattern texture" priority />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <ChefHat className="mx-auto h-20 w-20 text-primary mb-6 opacity-90 transform transition-transform duration-500 hover:scale-110" />
          <h1 className="text-5xl md:text-7xl font-headline text-foreground mb-8 leading-tight">
            Explore a World of Flavors
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto">
            Discover authentic recipes from every corner of the globe. Your culinary adventure starts here.
          </p>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 mb-10">
            <Input
              type="text"
              placeholder="Search for recipes (e.g., Pizza, Sushi, Tacos...)"
              value={heroSearchTerm}
              onChange={(e) => setHeroSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleHeroSearch()}
              className="flex-grow text-base py-3.5 px-5 h-14 bg-card text-foreground focus:bg-card/90 shadow-lg border-border/50 focus:ring-2 focus:ring-primary/50 rounded-lg"
              aria-label="Search recipes"
            />
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
        <RecipeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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

      <section id="recipe-listing-section" className="scroll-mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-headline text-foreground flex items-center">
            <Palette size={30} className="mr-3 text-accent" />
            {searchTerm || selectedRegion || selectedCountry || selectedIngredients.length > 0 ? "Filtered Recipes" : "Discover Recipes"}
          </h2>
          { (searchTerm || selectedRegion || selectedCountry || selectedIngredients.length > 0) && (
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

      <VoiceSearchModal isOpen={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen} onRecipeSelect={handleAiRecipeSelect} />
      <ImageSearchModal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen} onRecipeSelect={handleAiRecipeSelect} />
    </div>
  );
}
