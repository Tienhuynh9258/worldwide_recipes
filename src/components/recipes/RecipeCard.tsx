import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Globe, Flag } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = () => {
    let prep = 0;
    let cook = 0;
    if (recipe.prepTime) {
      const prepMatch = recipe.prepTime.match(/\d+/);
      if (prepMatch) prep = parseInt(prepMatch[0], 10);
    }
    if (recipe.cookTime) {
      const cookMatch = recipe.cookTime.match(/\d+/);
      if (cookMatch) cook = parseInt(cookMatch[0], 10);
    }
    const total = prep + cook;
    return total > 0 ? `${total} mins` : null;
  };

  // Function to get food category icon based on recipe name/type
  const getFoodCategoryIcon = (recipeName: string, country: string) => {
    const name = recipeName.toLowerCase();
    const countryLower = country.toLowerCase();
    
    // Pasta dishes
    if (name.includes('spaghetti') || name.includes('pasta') || name.includes('carbonara')) {
      return { icon: '🍝', category: 'Pasta', color: 'bg-amber-500/90' };
    }
    // Asian dishes
    if (name.includes('sushi') || name.includes('ramen') || name.includes('pad thai') || name.includes('rendang') || countryLower.includes('japan') || countryLower.includes('thailand') || countryLower.includes('indonesia')) {
      return { icon: '🍜', category: 'Asian', color: 'bg-red-500/90' };
    }
    // Indian/Curry dishes
    if (name.includes('tikka') || name.includes('masala') || name.includes('curry') || name.includes('pav bhaji') || countryLower.includes('india')) {
      return { icon: '🍛', category: 'Curry', color: 'bg-orange-500/90' };
    }
    // Mexican/Tacos
    if (name.includes('taco') || name.includes('pastor') || countryLower.includes('mexico')) {
      return { icon: '🌮', category: 'Mexican', color: 'bg-lime-500/90' };
    }
    // Seafood
    if (name.includes('fish') || name.includes('seafood') || name.includes('bouillabaisse') || name.includes('shrimp')) {
      return { icon: '🐟', category: 'Seafood', color: 'bg-blue-500/90' };
    }
    // Mediterranean/Greek
    if (name.includes('moussaka') || name.includes('greek') || countryLower.includes('greece')) {
      return { icon: '🫒', category: 'Mediterranean', color: 'bg-green-600/90' };
    }
    // French
    if (name.includes('ratatouille') || countryLower.includes('france')) {
      return { icon: '🥖', category: 'French', color: 'bg-indigo-500/90' };
    }
    // African/Middle Eastern
    if (name.includes('shakshuka') || countryLower.includes('tunisia') || countryLower.includes('africa')) {
      return { icon: '🍳', category: 'African', color: 'bg-yellow-600/90' };
    }
    // British
    if (name.includes('chips') || countryLower.includes('uk') || countryLower.includes('britain')) {
      return { icon: '🍟', category: 'British', color: 'bg-slate-500/90' };
    }
    // Japanese specialties
    if (name.includes('okonomiyaki')) {
      return { icon: '🥞', category: 'Japanese', color: 'bg-pink-500/90' };
    }
    
    // More specific assignments instead of "Global"
    // European dishes
    if (countryLower.includes('italy') || countryLower.includes('spain') || countryLower.includes('germany')) {
      return { icon: '🇪🇺', category: 'European', color: 'bg-blue-600/90' };
    }
    // American dishes  
    if (countryLower.includes('usa') || countryLower.includes('america')) {
      return { icon: '🍔', category: 'American', color: 'bg-red-600/90' };
    }
    // Comfort food
    if (name.includes('soup') || name.includes('stew') || name.includes('casserole')) {
      return { icon: '🥣', category: 'Comfort', color: 'bg-orange-600/90' };
    }
    // Grilled/BBQ
    if (name.includes('grilled') || name.includes('bbq') || name.includes('barbecue')) {
      return { icon: '🔥', category: 'Grilled', color: 'bg-red-700/90' };
    }
    // Vegetarian
    if (name.includes('vegetable') || name.includes('salad') || name.includes('veggie')) {
      return { icon: '🥗', category: 'Veggie', color: 'bg-green-500/90' };
    }
    
    // Default - assign to World Cuisine instead of Global
    return { icon: '🌍', category: 'World', color: 'bg-purple-500/90' };
  };

  const foodCategory = getFoodCategoryIcon(recipe.name, recipe.country);

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="block group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-transform duration-200"
    >
      <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-spice hover:shadow-xl transition-all duration-300 border-2 border-spice-orange/20 hover:border-spice-orange/60 bg-card group-hover:scale-[1.03] group-focus-visible:scale-[1.03] btn-interactive hover-glow">
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-focus-visible:scale-110"
              data-ai-hint={`${recipe.name.toLowerCase().split(' ').slice(0, 2).join(' ')} food delicious`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top badges - Region and Country */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 max-w-[calc(100%-1.5rem)]">
              <Badge className="bg-herb-green/90 text-white text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-herb max-w-[140px] btn-interactive animate-slide-in-left">
                <Globe size={14} className="animate-spin-slow" /> <span className="truncate">📍 {recipe.region}</span>
              </Badge>
              <Badge className="bg-tomato-red/90 text-white text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-herb max-w-[140px] btn-interactive animate-slide-in-right">
                <Flag size={14} className="animate-wiggle" /> <span className="truncate">🏴 {recipe.country}</span>
              </Badge>
            </div>

            {/* Chef's Special indicator for featured recipes - Bottom Right */}
            {(parseInt(recipe.id) <= 5) && (
              <div className="absolute bottom-3 right-3 z-10">
                <Badge className="bg-saffron-yellow/95 text-warm-gray text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-spice animate-pulse-glow btn-ripple">
                  <ChefHat size={12} className="animate-heartbeat" />
                  <span>Chef's Special</span>
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col">
          <CardTitle className="text-headline-md font-headline mb-3 group-hover:text-spice-orange transition-colors duration-300 truncate">
            {recipe.name}
          </CardTitle>
          <p className="text-body-lg text-warm-gray/80 line-clamp-3 mb-4 flex-grow group-hover:text-warm-gray transition-colors duration-300">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-2 border-t border-border/20 mt-auto">
          <div className="flex justify-between items-center w-full">
            <Badge className={`${foodCategory.color} text-white font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-spice group-hover:scale-105 transition-all duration-300 btn-interactive`}>
              <span className="text-lg animate-bounce">{foodCategory.icon}</span>
              <span className="font-semibold">{foodCategory.category}</span>
            </Badge>
            {totalTime() && (
              <div className="flex items-center text-sm text-warm-gray/80 group-hover:text-spice-orange transition-colors duration-300 font-semibold">
                <Clock size={16} className="mr-1 text-herb-green animate-pulse" />
                ⏱️ {totalTime()}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
