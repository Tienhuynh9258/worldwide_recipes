
"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin as IconMapPin, ListFilter, FilterX } from 'lucide-react'; // Added FilterX
import type { IngredientGroup } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

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
  categorizedIngredients: IngredientGroup[];
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
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedCountry('');
    setSelectedIngredients([]);
  };

  const hasActiveFilters = searchTerm || selectedRegion || selectedCountry || selectedIngredients.length > 0;

  return (
    <div className="mb-12 p-6 bg-card rounded-xl shadow-xl border border-border/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-headline text-foreground">Filter Recipes</h2>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearAllFilters} className="text-sm text-primary hover:text-primary/80">
            <FilterX size={16} className="mr-2" /> Clear All Filters
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="space-y-2">
          <Label htmlFor="dishNameSearch" className="flex items-center text-sm font-medium text-foreground/80">
            <Search size={16} className="mr-2 text-primary" />
            Search by Dish Name
          </Label>
          <Input
            id="dishNameSearch"
            type="text"
            placeholder="e.g., Carbonara, Sushi..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 focus:bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regionFilter" className="flex items-center text-sm font-medium text-foreground/80">
            <IconMapPin size={16} className="mr-2 text-primary" />
            Filter by Region
          </Label>
          <Select
            value={selectedRegion}
            onValueChange={(value) => {
              setSelectedRegion(value === ALL_REGIONS_PLACEHOLDER_VALUE ? "" : value);
            }}
          >
            <SelectTrigger id="regionFilter" className="w-full bg-background/50 focus:bg-background">
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

        <div className="space-y-2">
          <Label htmlFor="countryFilter" className="flex items-center text-sm font-medium text-foreground/80">
            <IconMapPin size={16} className="mr-2 text-primary" />
           Filter by Country
          </Label>
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value === ALL_COUNTRIES_PLACEHOLDER_VALUE ? "" : value);
            }}
          >
            <SelectTrigger id="countryFilter" className="w-full bg-background/50 focus:bg-background">
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

      <Accordion type="single" collapsible className="w-full mt-8 border-t border-border/50 pt-6">
        <AccordionItem value="ingredients-main" className="border-b-0">
          <AccordionTrigger className="text-base font-medium hover:no-underline py-3 px-1 text-foreground">
            <div className="flex items-center">
              <ListFilter size={18} className="mr-2 text-primary" />
              Filter by Ingredients (Nutritional Groups)
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <Accordion type="multiple" collapsible className="w-full space-y-2 pt-2">
              {categorizedIngredients.map((group) => (
                <AccordionItem key={group.groupName} value={group.groupName} className="border rounded-lg overflow-hidden bg-background/30">
                  <AccordionTrigger className="text-sm font-medium py-3 px-4 hover:bg-muted/50 rounded-t-md">
                    {group.groupName} ({group.ingredients.length})
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-4 px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                      {group.ingredients.map(ingredient => (
                        <div key={ingredient.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ingredient-${group.groupName}-${ingredient.name}`}
                            checked={selectedIngredients.includes(ingredient.name)}
                            onCheckedChange={() => handleIngredientChange(ingredient.name)}
                          />
                          <Label 
                            htmlFor={`ingredient-${group.groupName}-${ingredient.name}`} 
                            className="text-sm font-normal cursor-pointer hover:text-primary transition-colors"
                          >
                            {ingredient.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
