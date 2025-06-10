
import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, Soup, CheckCircle, MapPin, Bookmark, Share2, Printer } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface RecipePageProps {
  params: { id: string };
}

async function getRecipe(id: string): Promise<Recipe | undefined> {
  // Simulate API delay
  // await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecipes.find(recipe => recipe.id === id);
}

export async function generateStaticParams() {
  return mockRecipes.map(recipe => ({
    id: recipe.id,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <MapPin size={48} className="mx-auto text-destructive mb-4" /> {/* Or another fitting icon */}
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

  const metadataIcons = [
    { icon: Clock, label: "Prep Time", value: recipe.prepTime },
    { icon: Soup, label: "Cook Time", value: recipe.cookTime },
    { icon: Users, label: "Servings", value: recipe.servings },
    { icon: MapPin, label: "Origin", value: `${recipe.region}, ${recipe.country}` }
  ].filter(item => item.value);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Button variant="outline" asChild className="mb-8 text-sm bg-card hover:bg-muted transition-colors">
        <Link href="/">
          <ArrowLeft size={16} className="mr-2" /> Back to Recipes
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-2xl rounded-xl border-border/50 bg-card">
        <CardHeader className="p-0 relative">
          <div className="w-full h-[350px] md:h-[450px] relative">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={`${recipe.name.toLowerCase().split(" ").slice(0,2).join(" ")} plated dish`}
              className="rounded-t-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <Badge variant="secondary" className="mb-3 bg-black/30 text-white backdrop-blur-sm border-white/30 text-sm px-3 py-1">
              {recipe.region} &bull; {recipe.country}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-headline text-white mb-3 drop-shadow-lg">{recipe.name}</h1>
            <p className="text-base md:text-lg text-gray-200 drop-shadow-sm max-w-3xl">{recipe.description}</p>
          </div>
           <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 text-white border-white/50 backdrop-blur-sm rounded-full">
              <Bookmark size={18} />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 text-white border-white/50 backdrop-blur-sm rounded-full">
              <Share2 size={18} />
              <span className="sr-only">Share</span>
            </Button>
             <Button variant="outline" size="icon" className="bg-white/20 hover:bg-white/40 text-white border-white/50 backdrop-blur-sm rounded-full">
              <Printer size={18} />
              <span className="sr-only">Print</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-10 space-y-10">
          {metadataIcons.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {metadataIcons.map(item => (
                <div key={item.label} className="p-4 bg-muted/40 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
                  <item.icon size={28} className="mb-2 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          
          <Separator className="bg-border/50" />

          <div>
            <h2 className="text-3xl font-headline text-foreground mb-6">Ingredients</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.name} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0 border border-border/30 group">
                    <Image 
                      src={ingredient.image} 
                      alt={ingredient.name} 
                      layout="fill" 
                      objectFit="cover" 
                      data-ai-hint={`${ingredient.name.toLowerCase()} ingredient food item`}
                      className="group-hover:scale-105 transition-transform duration-200"
                      sizes="80px"
                    />
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

          <Separator className="bg-border/50" />

          <div>
            <h2 className="text-3xl font-headline text-foreground mb-6">Preparation Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((step: string, index: number) => (
                <li key={index} className="flex items-start p-4 bg-muted/30 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                  <CheckCircle size={28} className="text-primary mr-4 mt-1 shrink-0" />
                  <div className="flex-grow">
                    <span className="font-semibold text-foreground block mb-1 text-lg">Step {index + 1}</span>
                    <p className="text-foreground/90 leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <Separator className="bg-border/50" />
              <div>
                 <Alert className="bg-accent/10 border-accent/30 text-accent-foreground p-6 rounded-lg shadow-inner">
                   <MapPin size={24} className="text-accent absolute left-5 top-6 hidden sm:block opacity-70" />
                  <AlertTitle className="font-headline text-2xl text-accent pl-0 sm:pl-8 mb-2">Chef's Culinary Notes</AlertTitle>
                  <AlertDescription className="mt-2 text-accent-foreground/90 leading-relaxed pl-0 sm:pl-8">
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
