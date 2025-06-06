
"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin as IconMapPin, ListFilter } from 'lucide-react';
import type { IngredientGroup } from '@/lib/mock-data'; // Import the new types

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
  categorizedIngredients: IngredientGroup[]; // Changed prop
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
  categorizedIngredients, // Changed prop
}: RecipeFiltersProps) {
  
  const handleIngredientChange = (ingredientName: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(item => item !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
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

      <Accordion type="single" collapsible className="w-full mt-6">
        <AccordionItem value="ingredients-main">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center">
              <ListFilter size={16} className="mr-2" />
              Filter by Ingredients (Nutritional Groups)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" collapsible className="w-full space-y-1 pt-2">
              {categorizedIngredients.map((group) => (
                <AccordionItem key={group.groupName} value={group.groupName}>
                  <AccordionTrigger className="text-sm py-2 hover:bg-muted/50 rounded-md px-2">
                    {group.groupName} ({group.ingredients.length})
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 pl-4">
                      {group.ingredients.map(ingredient => (
                        <div key={ingredient.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ingredient-${group.groupName}-${ingredient.name}`}
                            checked={selectedIngredients.includes(ingredient.name)}
                            onCheckedChange={() => handleIngredientChange(ingredient.name)}
                          />
                          <Label 
                            htmlFor={`ingredient-${group.groupName}-${ingredient.name}`} 
                            className="text-sm font-normal cursor-pointer hover:text-primary"
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
