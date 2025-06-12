import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Utensils, ChefHat, Globe, Flag } from 'lucide-react';

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

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="block group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-transform duration-200"
    >
      <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/30 hover:border-primary/60 bg-card group-hover:scale-[1.025] group-focus-visible:scale-[1.025]">
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-focus-visible:scale-110"
              data-ai-hint={`${recipe.name.toLowerCase().split(' ').slice(0, 2).join(' ')} food delicious`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 animate-fade-in">
                <Globe size={14} className="mr-1 -ml-1" color="#3A86FF" /> {recipe.region}
              </Badge>
              <Badge className="bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 animate-fade-in delay-100">
                <Flag size={13} className="mr-1 -ml-1" color="#E4572E" /> {recipe.country}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col">
          <CardTitle className="text-xl lg:text-2xl font-headline mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {recipe.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-2 border-t border-border/20 mt-auto">
          <div className="flex justify-between items-center w-full">
            <Badge
              variant="outline"
              className="text-xs font-medium bg-accent/10 text-foreground border-accent/30 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors duration-200 flex items-center gap-1"
            >
              <Utensils size={14} className="mr-1 text-accent" />
              Recipe
            </Badge>
            {totalTime() && (
              <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
                <Clock size={14} className="mr-1 text-accent" />
                {totalTime()}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
