
"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin as IconMapPin, ListFilter, FilterX, Salad, Wheat, Drumstick, CookingPot, ChefHat, Palette } from 'lucide-react';
import type { IngredientGroup } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


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

const groupIcons: { [key: string]: React.ElementType } = {
  'Protein': Drumstick,
  'Carbohydrate': Wheat,
  'Fat': CookingPot, // Using CookingPot for a more generic 'fat/oil' visual
  'Vitamins & Minerals (Vegetables, Fruits, Spices)': Salad,
};


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
    <Card className="mb-12 p-6 md:p-8 bg-card rounded-xl shadow-xl border border-border/40 transition-all duration-300 ease-in-out hover:shadow-2xl">
      <CardHeader className="p-0 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-3xl font-headline text-foreground flex items-center">
            <Palette size={30} className="mr-3 text-primary" /> Filter & Refine Your Search
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearAllFilters} className="text-sm text-primary hover:text-primary/80 self-start sm:self-center px-3 py-1.5 h-auto">
              <FilterX size={18} className="mr-2" /> Clear All Filters
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          
          <div className="space-y-2">
            <Label htmlFor="dishNameSearch" className="flex items-center text-base font-medium text-foreground/90">
              <Search size={18} className="mr-2.5 text-primary" />
              Search by Dish Name
            </Label>
            <Input
              id="dishNameSearch"
              type="text"
              placeholder="e.g., Carbonara, Sushi..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="w-full bg-muted/40 focus:bg-background shadow-sm text-base py-3 px-4 h-12 border-border/50 focus:ring-2 focus:ring-primary/50"
              aria-label="Search by dish name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regionFilter" className="flex items-center text-base font-medium text-foreground/90">
              <IconMapPin size={18} className="mr-2.5 text-primary" />
              Filter by Region
            </Label>
            <Select
              value={selectedRegion || ALL_REGIONS_PLACEHOLDER_VALUE}
              onValueChange={(value) => {
                setSelectedRegion(value === ALL_REGIONS_PLACEHOLDER_VALUE ? "" : value);
              }}
            >
              <SelectTrigger id="regionFilter" className="w-full bg-muted/40 focus:bg-background shadow-sm text-base h-12 border-border/50 focus:ring-2 focus:ring-primary/50">
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
            <Label htmlFor="countryFilter" className="flex items-center text-base font-medium text-foreground/90">
              <IconMapPin size={18} className="mr-2.5 text-primary" />
            Filter by Country
            </Label>
            <Select
              value={selectedCountry || ALL_COUNTRIES_PLACEHOLDER_VALUE}
              onValueChange={(value) => {
                setSelectedCountry(value === ALL_COUNTRIES_PLACEHOLDER_VALUE ? "" : value);
              }}
            >
              <SelectTrigger id="countryFilter" className="w-full bg-muted/40 focus:bg-background shadow-sm text-base h-12 border-border/50 focus:ring-2 focus:ring-primary/50">
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

        <Accordion type="single" collapsible className="w-full mt-10 border-t border-border/40 pt-8">
          <AccordionItem value="ingredients-main" className="border-b-0">
            <AccordionTrigger className="text-xl font-medium hover:no-underline py-3 px-1 text-foreground hover:text-primary transition-colors duration-200">
              <div className="flex items-center">
                <ChefHat size={24} className="mr-3 text-primary" /> 
                Filter by Ingredients (Nutritional Groups)
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <Accordion type="multiple" className="w-full space-y-4 pt-2">
                {categorizedIngredients.map((group) => {
                  const GroupIcon = groupIcons[group.groupName] || ListFilter;
                  return (
                    <AccordionItem key={group.groupName} value={group.groupName} className="border rounded-lg overflow-hidden bg-muted/20 shadow-md hover:shadow-lg transition-shadow duration-300 border-border/30">
                      <AccordionTrigger className="text-lg font-medium py-4 px-5 hover:bg-muted/40 rounded-t-lg hover:no-underline transition-colors duration-200 focus:bg-muted/40">
                        <div className="flex items-center">
                          <GroupIcon size={20} className="mr-3 text-primary/90" />
                          {group.groupName} ({selectedIngredients.filter(si => group.ingredients.some(i => i.name === si)).length}/{group.ingredients.length})
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-5 px-5 bg-background/20">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                          {group.ingredients.map(ingredient => (
                            <div key={ingredient.name} className="flex items-center space-x-3 group">
                              <Checkbox
                                id={`ingredient-${group.groupName}-${ingredient.name.replace(/\s+/g, '-')}`}
                                checked={selectedIngredients.includes(ingredient.name)}
                                onCheckedChange={() => handleIngredientChange(ingredient.name)}
                                aria-label={`Filter by ${ingredient.name}`}
                                className="border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-200 transform group-hover:scale-110"
                              />
                              <Label 
                                htmlFor={`ingredient-${group.groupName}-${ingredient.name.replace(/\s+/g, '-')}`} 
                                className="text-base font-normal cursor-pointer group-hover:text-primary transition-colors duration-200 leading-snug"
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
