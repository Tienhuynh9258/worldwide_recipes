
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { Mic, ImageUp, AlertTriangle, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

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
    setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoadingRecipes(false);
    }, 500);
  }, []);

  const handleHeroSearch = () => {
    setSearchTerm(heroSearchTerm);
    // Optionally clear other filters or scroll to search results
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
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
  };

  return (
    <div className="space-y-12">
      <section 
        className="relative text-center py-16 md:py-24 bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundImage: "url('https://placehold.co/1200x400.png')" }}
        data-ai-hint="food collage culinary"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline text-white mb-6">
            Discover Your Next Favorite Dish
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Journey through a world of authentic flavors. Search, explore, and cook with confidence.
          </p>
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 mb-8">
            <Input
              type="text"
              placeholder="Search recipes (e.g., Pizza, Sushi, Curry...)"
              value={heroSearchTerm}
              onChange={(e) => setHeroSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleHeroSearch()}
              className="flex-grow text-base py-3 px-4 h-auto bg-white/90 text-foreground focus:bg-white"
            />
            <Button size="lg" onClick={handleHeroSearch} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 w-full sm:w-auto">
              <Search size={20} className="mr-2" /> Search
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsVoiceModalOpen(true)} 
              className="bg-white/10 hover:bg-white/20 text-white border-white/50 backdrop-blur-sm"
            >
              <Mic className="mr-2" /> Search with Voice
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsImageModalOpen(true)} 
              className="bg-white/10 hover:bg-white/20 text-white border-white/50 backdrop-blur-sm"
            >
              <ImageUp className="mr-2" /> Search with Image
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

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

      {isLoadingRecipes ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card p-4 rounded-xl shadow-lg h-[400px]">
                <div className="w-full h-56 bg-muted rounded-lg mb-4"></div>
                <div className="w-3/4 h-7 bg-muted rounded mb-3"></div>
                <div className="w-full h-5 bg-muted rounded mb-2"></div>
                <div className="w-1/2 h-5 bg-muted rounded"></div>
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
        <div className="text-center py-16">
          <AlertTriangle className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-2xl font-semibold text-foreground mb-3">No Recipes Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any recipes matching your current filters. Try adjusting your search terms or broadening your criteria.
          </p>
        </div>
      )}

      <VoiceSearchModal isOpen={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen} onRecipeSelect={handleAiRecipeSelect} />
      <ImageSearchModal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen} onRecipeSelect={handleAiRecipeSelect} />
    </div>
  );
}
