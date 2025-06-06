import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, Soup, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RecipePageProps {
  params: { id: string };
}

// This function can be used with dynamic rendering if data comes from an API.
// For static generation with a fixed set of recipes:
// export async function generateStaticParams() {
//   return mockRecipes.map(recipe => ({ id: recipe.id }));
// }

async function getRecipe(id: string): Promise<Recipe | undefined> {
  // In a real app, this would be an API call.
  return mockRecipes.find(recipe => recipe.id === id);
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft size={18} className="mr-2" /> Back to Recipes
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative">
          <div className="w-full h-72 md:h-96 relative">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="food dish"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-headline text-white mb-2">{recipe.name}</h1>
            <p className="text-base text-gray-200">{recipe.description}</p>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {recipe.prepTime && (
              <div className="p-3 bg-secondary/50 rounded-lg">
                <Clock size={24} className="mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Prep Time</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>
            )}
            {recipe.cookTime && (
              <div className="p-3 bg-secondary/50 rounded-lg">
                <Soup size={24} className="mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
            )}
            {recipe.servings && (
              <div className="p-3 bg-secondary/50 rounded-lg">
                <Users size={24} className="mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            )}
             <div className="p-3 bg-secondary/50 rounded-lg">
                <MapPin size={24} className="mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Origin</p>
                <p className="font-semibold">{recipe.region}, {recipe.country}</p>
              </div>
          </div>
          
          <Separator />

          <div>
            <h2 className="text-2xl font-headline text-foreground mb-4">Ingredients</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.name} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-md">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image src={ingredient.image} alt={ingredient.name} layout="fill" objectFit="cover" data-ai-hint="food item"/>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{ingredient.name}</span>
                    <span className="text-sm text-muted-foreground block">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    {ingredient.notes && <span className="text-xs text-accent italic block">({ingredient.notes})</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-headline text-foreground mb-4">Preparation Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={20} className="text-primary mr-3 mt-1 shrink-0" />
                  <p className="text-foreground">
                    <span className="font-semibold">Step {index + 1}: </span>{step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <Separator />
              <div>
                 <Alert>
                  <AlertTitle className="font-headline text-xl">Chef's Notes</AlertTitle>
                  <AlertDescription className="mt-2 text-foreground">
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

// Helper icon, as lucide-react MapPin might conflict if imported twice in the same file context or similar name exists
const MapPin = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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
