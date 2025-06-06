
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Recipe } from '@/types';
import { mockRecipes, commonRegions, commonCountries, categorizedIngredientsData } from '@/lib/mock-data'; // Added categorizedIngredientsData
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeFilters from '@/components/recipes/RecipeFilters';
import { Button } from '@/components/ui/button';
import VoiceSearchModal from '@/components/search/VoiceSearchModal';
import ImageSearchModal from '@/components/search/ImageSearchModal';
import { Mic, ImageUp, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Initialize as empty, load in useEffect
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true); // Start as true


  useEffect(() => {
    setIsLoadingRecipes(true);
    // Simulate API call
    setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoadingRecipes(false);
    }, 500);
  }, []);


  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const nameMatch = searchTerm === '' ? true : recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const regionMatch = selectedRegion ? recipe.region === selectedRegion : true;
      const countryMatch = selectedCountry ? recipe.country === selectedCountry : true;
      
      // Updated ingredient matching logic: recipe must contain ALL selected ingredients
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
    // Optionally clear other filters or scroll to search results
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
  };

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-lg shadow">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Explore Global Flavors</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Dive into a world of culinary delights. Search, filter, or use our AI-powered tools to discover your next favorite dish.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" onClick={() => setIsVoiceModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Mic className="mr-2" /> Search with Voice
          </Button>
          <Button size="lg" onClick={() => setIsImageModalOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <ImageUp className="mr-2" /> Search with Image
          </Button>
        </div>
      </section>

      <Separator />

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
        categorizedIngredients={categorizedIngredientsData} // Pass categorized data
      />

      {isLoadingRecipes ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => ( // Show more placeholders
              <div key={i} className="bg-card p-4 rounded-lg shadow h-[350px]">
                <div className="w-full h-48 bg-muted rounded mb-4"></div>
                <div className="w-3/4 h-6 bg-muted rounded mb-2"></div>
                <div className="w-full h-4 bg-muted rounded mb-1"></div>
                <div className="w-1/2 h-4 bg-muted rounded"></div>
              </div>
            ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Recipes Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      <VoiceSearchModal isOpen={isVoiceModalOpen} onOpenChange={setIsVoiceModalOpen} onRecipeSelect={handleAiRecipeSelect} />
      <ImageSearchModal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen} onRecipeSelect={handleAiRecipeSelect} />
    </div>
  );
}
