import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
              data-ai-hint="food dish"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl font-headline mb-2 leading-tight group-hover:text-primary transition-colors">{recipe.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-xs text-accent-foreground bg-accent/20 px-2 py-1 rounded-full">
            <MapPin size={14} className="mr-1.5 text-accent" />
            <span>{recipe.region}, {recipe.country}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
