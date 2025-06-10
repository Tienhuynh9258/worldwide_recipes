
import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, Soup, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface RecipePageProps {
  params: { id: string };
}

async function getRecipe(id: string): Promise<Recipe | undefined> {
  return mockRecipes.find(recipe => recipe.id === id);
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-destructive mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't find the recipe you're looking for.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft size={18} className="mr-2" /> Back to All Recipes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Button variant="outline" asChild className="mb-8 text-sm">
        <Link href="/">
          <ArrowLeft size={16} className="mr-2" /> Back to Recipes
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-2xl rounded-xl border-border/50">
        <CardHeader className="p-0 relative">
          <div className="w-full h-[400px] md:h-[500px] relative"> {/* Increased height */}
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="food dish plated"
              className="rounded-t-xl"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white backdrop-blur-sm">
              {recipe.region} &bull; {recipe.country}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-headline text-white mb-3 drop-shadow-lg">{recipe.name}</h1>
            <p className="text-base md:text-lg text-gray-200 drop-shadow-sm max-w-3xl">{recipe.description}</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-10 space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Clock, label: "Prep Time", value: recipe.prepTime },
              { icon: Soup, label: "Cook Time", value: recipe.cookTime },
              { icon: Users, label: "Servings", value: recipe.servings },
              { icon: MapPinIcon, label: "Origin", value: `${recipe.region}, ${recipe.country}` }
            ].filter(item => item.value).map(item => (
              <div key={item.label} className="p-4 bg-muted/40 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <item.icon size={28} className="mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          
          <Separator />

          <div>
            <h2 className="text-3xl font-headline text-foreground mb-6">Ingredients</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.name} className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 border border-border/30">
                    <Image src={ingredient.image} alt={ingredient.name} layout="fill" objectFit="cover" data-ai-hint="food item ingredient"/>
                  </div>
                  <div className="flex-grow">
                    <span className="font-semibold text-lg text-foreground block">{ingredient.name}</span>
                    <span className="text-sm text-muted-foreground block">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    {ingredient.notes && <span className="text-xs text-accent italic block mt-1">({ingredient.notes})</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-3xl font-headline text-foreground mb-6">Preparation Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step: string, index: number) => (
                <li key={index} className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <CheckCircle size={24} className="text-primary mr-4 mt-1 shrink-0" />
                  <div className="flex-grow">
                    <span className="font-semibold text-foreground block mb-1">Step {index + 1}</span>
                    <p className="text-foreground/90 leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <Separator />
              <div>
                 <Alert className="bg-accent/10 border-accent/30 text-accent-foreground p-6 rounded-lg">
                   <MapPinIcon size={20} className="text-accent absolute left-4 top-7 hidden sm:block" /> {/* Example of adding an icon to Alert*/}
                  <AlertTitle className="font-headline text-2xl text-accent mb-2">Chef's Culinary Notes</AlertTitle>
                  <AlertDescription className="mt-2 text-accent-foreground/90 leading-relaxed">
                    {recipe.notes}
                  </AlertDescription>
                </Alert>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const MapPinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
