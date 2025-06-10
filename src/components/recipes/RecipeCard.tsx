
import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // Import Badge
import { MapPin } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-border/50">
        <CardHeader className="p-0">
          <div className="relative w-full h-56 aspect-video"> {/* Increased height */}
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
        <CardContent className="p-5 flex-grow"> {/* Increased padding */}
          <CardTitle className="text-xl font-headline mb-2 leading-tight group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">{recipe.description}</p> {/* Increased line-clamp */}
        </CardContent>
        <CardFooter className="p-5 pt-0"> {/* Increased padding */}
           <Badge variant="outline" className="text-xs font-medium bg-accent/10 text-accent-foreground border-accent/30 group-hover:bg-accent/20 transition-colors">
            <MapPin size={14} className="mr-1.5 text-accent" />
            {recipe.region}, {recipe.country}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
