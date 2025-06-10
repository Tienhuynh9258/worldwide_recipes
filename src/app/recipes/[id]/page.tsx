
import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, Soup, CheckCircle, MapPin, Bookmark, Share2, Printer, Info, Utensils, Sprout } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface RecipePageProps {
  params: { id: string };
}

async function getRecipe(id: string): Promise<Recipe | undefined> {
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
      <div className="text-center py-20">
        <Utensils size={64} className="mx-auto text-destructive mb-6" />
        <h1 className="text-4xl font-headline text-destructive mb-4">Recipe Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">Sorry, the culinary creation you're looking for seems to have vanished!</p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft size={20} className="mr-2" /> Back to All Recipes
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
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-10 text-sm bg-card hover:bg-muted transition-colors shadow-sm hover:shadow-md">
        <Link href="/">
          <ArrowLeft size={16} className="mr-2" /> Back to Recipes
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-2xl rounded-2xl border-border/40 bg-card">
        <CardHeader className="p-0 relative">
          <div className="w-full h-[400px] md:h-[550px] relative">
            <Image
              src={recipe.image}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={`${recipe.name.toLowerCase().split(" ").slice(0,2).join(" ")} gourmet food`}
              className="rounded-t-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <Badge variant="secondary" className="mb-4 bg-black/40 text-white backdrop-blur-sm border-white/40 text-base px-4 py-1.5 shadow-md">
              {recipe.region} &bull; {recipe.country}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-headline text-white mb-4 drop-shadow-xl leading-tight">{recipe.name}</h1>
            <p className="text-lg md:text-xl text-gray-100 drop-shadow-md max-w-4xl leading-relaxed">{recipe.description}</p>
          </div>
           <div className="absolute top-6 right-6 flex space-x-3">
            <Button variant="outline" size="icon" className="bg-white/25 hover:bg-white/50 text-white border-white/60 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-all duration-200">
              <Bookmark size={20} />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-white/25 hover:bg-white/50 text-white border-white/60 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-all duration-200">
              <Share2 size={20} />
              <span className="sr-only">Share</span>
            </Button>
             <Button variant="outline" size="icon" className="bg-white/25 hover:bg-white/50 text-white border-white/60 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-all duration-200">
              <Printer size={20} />
              <span className="sr-only">Print</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 md:p-12 space-y-12">
          {metadataIcons.length > 0 && (
            <section>
              <h2 className="text-3xl font-headline text-primary mb-6 flex items-center">
                <Info size={28} className="mr-3" /> Recipe Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-center">
                {metadataIcons.map(item => (
                  <div key={item.label} className="p-5 bg-muted/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-border/30 hover:border-primary/40 flex flex-col items-center justify-center transform hover:scale-105">
                    <item.icon size={32} className="mb-3 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-xl font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          <Separator className="bg-border/40" />

          <section>
            <h2 className="text-3xl font-headline text-primary mb-8 flex items-center">
                <Sprout size={28} className="mr-3" /> Ingredients
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {recipe.ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.name} className="flex items-center space-x-5 p-5 bg-muted/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-border/40 hover:border-primary/50 transform hover:scale-[1.02]">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 border-2 border-border/20 shadow-sm group transform transition-transform duration-300 group-hover:scale-105">
                    <Image 
                      src={ingredient.image} 
                      alt={ingredient.name} 
                      layout="fill" 
                      objectFit="cover" 
                      data-ai-hint={`${ingredient.name.toLowerCase()} ingredient food item photo`}
                      className="transition-transform duration-300 ease-in-out group-hover:brightness-110"
                      sizes="100px"
                    />
                  </div>
                  <div className="flex-grow">
                    <span className="font-semibold text-xl text-foreground block mb-1">{ingredient.name}</span>
                    <span className="text-base text-muted-foreground block">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    {ingredient.notes && <span className="text-sm text-accent italic block mt-1.5">({ingredient.notes})</span>}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="bg-border/40" />

          <section>
            <h2 className="text-3xl font-headline text-primary mb-8 flex items-center">
                <Utensils size={28} className="mr-3" /> Preparation Steps
            </h2>
            <ol className="space-y-8">
              {recipe.instructions.map((step: string, index: number) => (
                <li key={index} className="flex items-start p-6 bg-muted/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-border/40 hover:border-primary/50 transform hover:scale-[1.01]">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-5 mt-1 shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                     {/* <span className="font-semibold text-foreground block mb-1.5 text-lg">Step {index + 1}</span> */}
                    <p className="text-foreground/90 leading-relaxed text-base">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {recipe.notes && (
            <>
              <Separator className="bg-border/40" />
              <section>
                 <Alert className="bg-accent/10 border-accent/30 text-accent-foreground p-8 rounded-xl shadow-inner">
                   <Info size={28} className="text-accent absolute left-6 top-7 hidden sm:block opacity-80" />
                  <AlertTitle className="font-headline text-3xl text-accent pl-0 sm:pl-10 mb-3">Chef's Culinary Notes</AlertTitle>
                  <AlertDescription className="mt-2 text-accent-foreground/90 leading-relaxed text-base pl-0 sm:pl-10">
                    {recipe.notes}
                  </AlertDescription>
                </Alert>
              </section>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
