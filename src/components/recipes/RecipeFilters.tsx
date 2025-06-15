"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FilterX, Salad, Wheat, Drumstick, Droplet, Clock, Globe, Flag, ChefHat, Filter, Sparkles } from 'lucide-react';
import type { IngredientGroup } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RecipeFiltersProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCookingTime: string;
  setSelectedCookingTime: Dispatch<SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
  regions: string[];
  countries: string[];
  categorizedIngredients: IngredientGroup[];
}

const ALL_REGIONS_PLACEHOLDER_VALUE = "__ALL_REGIONS_PLACEHOLDER__";
const ALL_COUNTRIES_PLACEHOLDER_VALUE = "__ALL_COUNTRIES_PLACEHOLDER__";

const groupIcons: { [key: string]: (props: any) => JSX.Element } = {
  'Protein': (props) => <Drumstick {...props} className="text-tomato-red" />,
  'Carbohydrate': (props) => <Wheat {...props} className="text-saffron-yellow" />,
  'Fat': (props) => <Droplet {...props} className="text-spice-orange" />,
  'Vitamins & Minerals (Vegetables, Fruits, Spices)': (props) => <Salad {...props} className="text-herb-green" />,
};

const quickFilterOptions = [
  { id: 'under-15', label: '⚡ Quick', time: 'Under 15 min', gradient: 'bg-gradient-to-r from-herb-green to-saffron-yellow' },
  { id: '15-30', label: '🔥 Fast', time: '15-30 min', gradient: 'bg-gradient-to-r from-saffron-yellow to-spice-orange' },
  { id: '30-60', label: '👨‍🍳 Medium', time: '30-60 min', gradient: 'bg-gradient-to-r from-spice-orange to-tomato-red' },
  { id: 'over-60', label: '🍲 Slow', time: 'Over 1 hour', gradient: 'bg-gradient-to-r from-tomato-red to-deep-wine' },
];

export default function RecipeFilters({
  searchQuery,
  setSearchQuery,
  selectedCookingTime,
  setSelectedCookingTime,
  selectedRegion,
  setSelectedRegion,
  selectedCountry,
  setSelectedCountry,
  selectedIngredients,
  setSelectedIngredients,
  regions,
  countries,
  categorizedIngredients,
}: RecipeFiltersProps) {
  
  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(item => item !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
    setSelectedCookingTime('any');
  };

  const hasActiveFilters = searchQuery.trim() || selectedRegion || selectedCountry || selectedIngredients.length > 0 || (selectedCookingTime && selectedCookingTime !== 'any');

  return (
    <div className="mb-12 space-y-8">
      {/* Header Section */}
      <div className="text-center bg-kitchen-gradient p-8 rounded-2xl shadow-spice border-2 border-spice-orange/20">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
            <Filter size={32} className="text-white" />
          </div>
          <h2 className="text-display font-headline text-white drop-shadow-lg">
            🔍 Filter & Discover
          </h2>
          <p className="text-body-xl text-white/90 max-w-3xl text-center">
            Find your perfect recipe with our smart filtering system
          </p>
          {hasActiveFilters && (
            <Button 
              onClick={clearAllFilters} 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              variant="outline"
            >
              <FilterX size={18} className="mr-2" /> Clear All Filters
            </Button>
          )}
        </div>
      </div>

      {/* Quick Time Filters */}
      <div className="space-y-4">
        <h3 className="text-headline-md font-headline text-warm-gray flex items-center gap-4">
          <Clock className="text-spice-orange animate-bounce" size={32} />
          <span>Quick Time Filters</span>
          <span className="text-accent-script text-saffron-yellow">Lightning Fast ⏰</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickFilterOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-spice border-2 ${
                selectedCookingTime === option.id 
                  ? 'border-spice-orange shadow-spice scale-105' 
                  : 'border-spice-orange/20 hover:border-spice-orange/40'
              }`}
              onClick={() => setSelectedCookingTime(selectedCookingTime === option.id ? 'any' : option.id)}
            >
              <CardContent className={`p-4 text-center ${option.gradient} rounded-lg`}>
                <div className="text-white">
                  <div className="text-lg font-bold">{option.label}</div>
                  <div className="text-sm opacity-90">{option.time}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Location Filters */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-herb-gradient border-2 border-herb-green/20 shadow-herb hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <h3 className="text-headline-md font-headline text-white mb-4 flex items-center gap-3">
              <Globe size={28} className="text-white animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-accent-script">Explore 🌍</span>
            </h3>
            <Select
              value={selectedRegion || ALL_REGIONS_PLACEHOLDER_VALUE}
              onValueChange={(value) => {
                setSelectedRegion(value === ALL_REGIONS_PLACEHOLDER_VALUE ? "" : value);
              }}
            >
              <SelectTrigger className="w-full bg-white/90 hover:bg-white text-warm-gray h-12 border-0 shadow-md hover:shadow-lg transition-all duration-200">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_REGIONS_PLACEHOLDER_VALUE}>🌍 All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>📍 {region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-tomato-gradient border-2 border-tomato-red/20 shadow-herb hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <h3 className="text-headline-md font-headline text-white mb-4 flex items-center gap-3">
              <Flag size={28} className="text-white" />
              <span className="text-accent-script">Origins 🏳️</span>
            </h3>
            <Select
              value={selectedCountry || ALL_COUNTRIES_PLACEHOLDER_VALUE}
              onValueChange={(value) => {
                setSelectedCountry(value === ALL_COUNTRIES_PLACEHOLDER_VALUE ? "" : value);
              }}
            >
              <SelectTrigger className="w-full bg-white/90 hover:bg-white text-warm-gray h-12 border-0 shadow-md hover:shadow-lg transition-all duration-200">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_COUNTRIES_PLACEHOLDER_VALUE}>🏳️ All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>🏴 {country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Ingredients Section */}
      <Card className="bg-cream-gradient border-2 border-spice-orange/20 shadow-spice hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-headline-lg font-headline text-warm-gray flex items-center justify-center gap-4 mb-4">
              <ChefHat size={36} className="text-spice-orange animate-bounce" />
              <span>Filter by Ingredients</span>
              <Sparkles size={28} className="text-saffron-yellow animate-pulse" />
            </h3>
            <p className="text-body-lg text-warm-gray/80 text-center max-w-3xl mx-auto">
              Choose ingredients by nutritional categories and create your perfect dish
            </p>
          </div>
          
          <Accordion type="multiple" className="space-y-4">
            {categorizedIngredients.map((group) => {
              const GroupIcon = groupIcons[group.groupName] || Salad;
              const selectedCount = selectedIngredients.filter(si => group.ingredients.some(i => i.name === si)).length;
              return (
                <AccordionItem 
                  key={group.groupName} 
                  value={group.groupName} 
                  className="border-2 border-spice-orange/20 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger className="text-lg font-semibold py-6 px-6 hover:bg-soft-peach/30 hover:no-underline transition-colors duration-200 group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-soft-peach rounded-full group-hover:scale-110 transition-transform duration-200">
                          <GroupIcon size={24} />
                        </div>
                        <span className="text-warm-gray font-headline">{group.groupName}</span>
                      </div>
                      {selectedCount > 0 && (
                        <div className="bg-spice-orange text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                          {selectedCount} selected
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                      {group.ingredients.map(ingredient => (
                        <div 
                          key={ingredient.name} 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-soft-peach/30 transition-all duration-200 group cursor-pointer hover:scale-105"
                          onClick={() => handleIngredientChange(ingredient.name)}
                        >
                          <Checkbox
                            id={`ingredient-${group.groupName}-${ingredient.name.replace(/\s+/g, '-')}`}
                            checked={selectedIngredients.includes(ingredient.name)}
                            onCheckedChange={() => handleIngredientChange(ingredient.name)}
                            className="border-spice-orange data-[state=checked]:bg-spice-orange data-[state=checked]:border-spice-orange transition-all duration-200"
                          />
                          <Label 
                            htmlFor={`ingredient-${group.groupName}-${ingredient.name.replace(/\s+/g, '-')}`} 
                            className="text-sm text-warm-gray cursor-pointer group-hover:text-spice-orange transition-colors duration-200 font-medium"
                          >
                            {ingredient.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
