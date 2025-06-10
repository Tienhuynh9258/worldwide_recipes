
import type { Recipe } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-border/50 hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[4/3] overflow-hidden"> {/* Common aspect ratio for food */}
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300 ease-in-out"
              data-ai-hint={`${recipe.name.toLowerCase().split(" ").slice(0,2).join(" ")} food`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false} // Set true for above-the-fold images if any
            />
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          <CardTitle className="text-xl font-headline mb-2 leading-tight group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{recipe.description}</p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
           <Badge variant="outline" className="text-xs font-medium bg-accent/10 text-accent-foreground border-accent/30 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors">
            <MapPin size={14} className="mr-1.5 text-accent" />
            {recipe.region}, {recipe.country}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
