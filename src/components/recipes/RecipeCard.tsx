import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Utensils, Flame } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

export default function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
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

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
    >
      <Card
        className={`h-full flex flex-col overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-500 bg-card ${
          featured ? 'ring-1 ring-primary/10' : ''
        } group-hover:-translate-y-1`}
      >
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              data-ai-hint={`${recipe.name.toLowerCase().split(' ').slice(0, 2).join(' ')} food delicious`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {recipe.region && (
                <Badge
                  variant="secondary"
                  className="bg-black/40 text-white backdrop-blur-sm border-0 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 hover:bg-black/50"
                >
                  <MapPin size={10} className="mr-1" />
                  {recipe.region}
                </Badge>
              )}
              {featured && (
                <Badge
                  variant="default"
                  className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5"
                >
                  <Flame size={10} className="mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Bottom meta on image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {totalTime() && (
                <span className="inline-flex items-center text-white text-xs font-medium bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Clock size={11} className="mr-1" />
                  {totalTime()}
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow p-4 space-y-2">
          <CardTitle className="text-base font-headline font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {recipe.name}
          </CardTitle>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {recipe.description || `A delicious ${recipe.region || ''} recipe from ${recipe.country || 'around the world'}.`}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap items-center gap-2">
          {recipe.country && (
            <span className="inline-flex items-center text-[11px] font-medium text-muted-foreground bg-muted/60 rounded-full px-2.5 py-1">
              <Utensils size={10} className="mr-1 text-primary/70" />
              {recipe.country}
            </span>
          )}
          {recipe.servings && (
            <span className="inline-flex items-center text-[11px] font-medium text-muted-foreground bg-muted/60 rounded-full px-2.5 py-1">
              {recipe.servings} servings
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
