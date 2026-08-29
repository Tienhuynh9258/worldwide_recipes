"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, MapPin, ListFilter, FilterX, Salad, Wheat, Drumstick, CookingPot, ChefHat, Palette, Globe, Droplet } from 'lucide-react';
import type { IngredientGroup } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface RecipeFiltersProps {
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

const groupIconMap: Record<string, React.ReactNode> = {
  'Protein': <Drumstick size={14} className="text-rose-500" />,
  'Carbohydrate': <Wheat size={14} className="text-amber-500" />,
  'Fat': <Droplet size={14} className="text-sky-500" />,
  'Vitamins & Minerals (Vegetables, Fruits, Spices)': <Salad size={14} className="text-emerald-500" />,
};

export default function RecipeFilters({
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
  const clearFilters = () => {
    setSelectedCookingTime('any');
    setSelectedRegion(ALL_REGIONS_PLACEHOLDER_VALUE);
    setSelectedCountry(ALL_COUNTRIES_PLACEHOLDER_VALUE);
    setSelectedIngredients([]);
  };

  const handleIngredientToggle = (ingredientName: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((i) => i !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const activeFilterCount =
    (selectedCookingTime !== 'any' ? 1 : 0) +
    (selectedRegion && selectedRegion !== ALL_REGIONS_PLACEHOLDER_VALUE ? 1 : 0) +
    (selectedCountry && selectedCountry !== ALL_COUNTRIES_PLACEHOLDER_VALUE ? 1 : 0) +
    selectedIngredients.length;

  return (
    <div className="w-full h-full flex flex-col space-y-4" id="filter-section">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <ListFilter size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-headline font-bold text-foreground">Filters</h2>
            <p className="text-xs text-muted-foreground">Refine your search</p>
          </div>
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5"
          >
            <FilterX size={13} className="mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Region Select */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Globe size={13} className="text-primary/70" /> Region
        </Label>
        <Select value={selectedRegion || ALL_REGIONS_PLACEHOLDER_VALUE} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full rounded-xl border-border/50 bg-muted/30 hover:bg-muted/60 transition-colors h-10 text-sm">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value={ALL_REGIONS_PLACEHOLDER_VALUE}>All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="text-primary/60" />
                  {region}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Country Select */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Globe size={13} className="text-primary/70" /> Country
        </Label>
        <Select value={selectedCountry || ALL_COUNTRIES_PLACEHOLDER_VALUE} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full rounded-xl border-border/50 bg-muted/30 hover:bg-muted/60 transition-colors h-10 text-sm">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value={ALL_COUNTRIES_PLACEHOLDER_VALUE}>All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cooking Time */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <CookingPot size={13} className="text-primary/70" /> Cooking Time
        </Label>
        <Select value={selectedCookingTime || 'any'} onValueChange={setSelectedCookingTime}>
          <SelectTrigger className="w-full rounded-xl border-border/50 bg-muted/30 hover:bg-muted/60 transition-colors h-10 text-sm">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="30">Under 30 mins</SelectItem>
            <SelectItem value="60">Under 1 hour</SelectItem>
            <SelectItem value="120">Under 2 hours</SelectItem>
            <SelectItem value="121">2+ hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ingredients Accordion */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
          <Palette size={13} className="text-primary/70" /> Ingredients
        </Label>
        <div className="flex-1 overflow-y-auto pr-1 min-h-0 custom-scrollbar">
          <Accordion type="multiple" className="w-full space-y-1.5">
            {categorizedIngredients.map((group) => (
              <AccordionItem
                key={group.groupName}
                value={group.groupName}
                className="border border-border/40 rounded-xl overflow-hidden bg-muted/20 data-[state=open]:bg-muted/40 transition-colors"
              >
                <AccordionTrigger className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:no-underline hover:text-foreground transition-colors">
                  <span className="flex items-center gap-2">
                    {groupIconMap[group.groupName] || <ChefHat size={14} className="text-primary/60" />}
                    {group.groupName}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3">
                  <div className="space-y-2.5 pt-1">
                    {group.ingredients.map((ing) => (
                      <div key={ing.name} className="flex items-center space-x-2.5">
                        <Checkbox
                          id={`ing-${ing.name}`}
                          checked={selectedIngredients.includes(ing.name)}
                          onCheckedChange={() => handleIngredientToggle(ing.name)}
                          className="rounded-[5px] border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor={`ing-${ing.name}`}
                          className="text-xs text-muted-foreground leading-none cursor-pointer select-none hover:text-foreground transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {ing.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Active filter tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedCookingTime !== 'any' && (
            <span className="inline-flex items-center text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
              {selectedCookingTime === '121' ? '2+ hrs' : `< ${selectedCookingTime} min`}
            </span>
          )}
          {selectedRegion && selectedRegion !== ALL_REGIONS_PLACEHOLDER_VALUE && (
            <span className="inline-flex items-center text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
              {selectedRegion}
            </span>
          )}
          {selectedCountry && selectedCountry !== ALL_COUNTRIES_PLACEHOLDER_VALUE && (
            <span className="inline-flex items-center text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
              {selectedCountry}
            </span>
          )}
          {selectedIngredients.slice(0, 3).map((ing) => (
            <span key={ing} className="inline-flex items-center text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
              {ing}
            </span>
          ))}
          {selectedIngredients.length > 3 && (
            <span className="inline-flex items-center text-[10px] font-medium bg-muted text-muted-foreground rounded-full px-2 py-0.5">
              +{selectedIngredients.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
