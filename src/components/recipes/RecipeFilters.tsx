
"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin as IconMapPin, ListFilter } from 'lucide-react'; // Renamed MapPin to avoid conflict

interface RecipeFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  selectedIngredients: string[];
  setSelectedIngredients: Dispatch<SetStateAction<string[]>>;
  regions: string[];
  countries: string[];
  ingredients: string[];
}

const ALL_REGIONS_PLACEHOLDER_VALUE = "__ALL_REGIONS_PLACEHOLDER__";
const ALL_COUNTRIES_PLACEHOLDER_VALUE = "__ALL_COUNTRIES_PLACEHOLDER__";

export default function RecipeFilters({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  selectedCountry,
  setSelectedCountry,
  selectedIngredients,
  setSelectedIngredients,
  regions,
  countries,
  ingredients,
}: RecipeFiltersProps) {
  
  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Dish Name Search */}
        <div className="space-y-2">
          <Label htmlFor="dishNameSearch" className="flex items-center text-sm font-medium">
            <Search size={16} className="mr-2" />
            Search by Dish Name
          </Label>
          <Input
            id="dishNameSearch"
            type="text"
            placeholder="e.g., Carbonara, Sushi..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Region Filter */}
        <div className="space-y-2">
          <Label htmlFor="regionFilter" className="flex items-center text-sm font-medium">
            <IconMapPin size={16} className="mr-2" />
            Filter by Region
          </Label>
          <Select
            value={selectedRegion}
            onValueChange={(value) => {
              setSelectedRegion(value === ALL_REGIONS_PLACEHOLDER_VALUE ? "" : value);
            }}
          >
            <SelectTrigger id="regionFilter" className="w-full">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_REGIONS_PLACEHOLDER_VALUE}>All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Country Filter */}
        <div className="space-y-2">
          <Label htmlFor="countryFilter" className="flex items-center text-sm font-medium">
            <IconMapPin size={16} className="mr-2" />
           Filter by Country
          </Label>
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value === ALL_COUNTRIES_PLACEHOLDER_VALUE ? "" : value);
            }}
          >
            <SelectTrigger id="countryFilter" className="w-full">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_COUNTRIES_PLACEHOLDER_VALUE}>All Countries</SelectItem>
              {countries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Ingredient Filter */}
      <Accordion type="single" collapsible className="w-full mt-6">
        <AccordionItem value="ingredients">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center">
              <ListFilter size={16} className="mr-2" />
              Filter by Ingredients
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
              {ingredients.slice(0, 10).map(ingredient => ( // Show first 10 common ingredients
                <div key={ingredient} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ingredient-${ingredient}`}
                    checked={selectedIngredients.includes(ingredient)}
                    onCheckedChange={() => handleIngredientChange(ingredient)}
                  />
                  <Label htmlFor={`ingredient-${ingredient}`} className="text-sm font-normal cursor-pointer">
                    {ingredient}
                  </Label>
                </div>
              ))}
            </div>
             {ingredients.length > 10 && <p className="text-xs text-muted-foreground mt-2">Showing first 10 common ingredients. More specific search can be done via AI.</p>}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
