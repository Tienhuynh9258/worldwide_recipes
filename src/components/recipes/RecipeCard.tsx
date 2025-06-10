import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Utensils } from 'lucide-react';

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
      className="block group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card className="h-full flex flex-col overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-border/30 hover:border-primary/60 transform group-hover:scale-[1.02] group-focus-visible:scale-[1.02] group-focus-visible:border-primary/60 bg-card">
        <CardHeader className="p-0 relative">
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={`${recipe.name
                .toLowerCase()
                .split(' ')
                .slice(0, 2)
                .join(' ')} food delicious`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              className="text-xs font-medium bg-accent/10 text-foreground border-accent/30 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors duration-200"
            >
              <MapPin size={14} className="mr-1.5 text-accent" />
              {recipe.region}, {recipe.country}
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
