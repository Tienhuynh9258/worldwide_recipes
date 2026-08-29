import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Clock, Users, Soup, CheckCircle, Globe, Flag, Bookmark, Share2, Printer, Info, Utensils, ChefHat, Droplet, Sprout
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import RecipeCard from '@/components/recipes/RecipeCard';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

async function getRecipe(id: string): Promise<Recipe | undefined> {
  return mockRecipes.find(recipe => recipe.id === id);
}

export async function generateStaticParams() {
  return mockRecipes.map(recipe => ({
    id: recipe.id,
  }));
}

// Mock dietary tags logic (replace with real logic as needed)
function getDietaryTags(recipe: Recipe): string[] {
  // Example: mock based on ingredients
  const lowerNames = recipe.ingredients.map(i => i.name.toLowerCase());
  const tags: string[] = [];
  if (!lowerNames.some(n => n.includes('beef') || n.includes('pork') || n.includes('chicken') || n.includes('lamb') || n.includes('shrimp'))) {
    tags.push('Vegetarian');
  }
  if (!lowerNames.some(n => n.includes('egg') || n.includes('cheese') || n.includes('yogurt') || n.includes('cream'))) {
    tags.push('Vegan');
  }
  if (!lowerNames.some(n => n.includes('flour') || n.includes('bread') || n.includes('noodle') || n.includes('tortilla') || n.includes('wheat'))) {
    tags.push('Gluten-Free');
  }
  return tags;
}

// Helper to get main ingredients (first 1-2 ingredients)
function getMainIngredients(recipe: Recipe): string[] {
  return recipe.ingredients.slice(0, 2).map(i => i.name.toLowerCase());
}

function getRelatedRecipes(current: Recipe, all: Recipe[], count = 3): Recipe[] {
  return all
    .filter(r => r.id !== current.id)
    .map(r => {
      let score = 0;
      if (r.region === current.region) score += 3;
      if (r.country === current.country) score += 2;
      // Main ingredient overlap
      const mainA = getMainIngredients(current);
      const mainB = getMainIngredients(r);
      if (mainA.some(ing => mainB.includes(ing))) score += 2;
      return { ...r, _score: score };
    })
    .sort((a, b) => (b._score ?? 0) - (a._score ?? 0))
    .slice(0, count);
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipe(id);
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
  const dietaryTags = getDietaryTags(recipe);
  // Smarter related recipes
  const relatedRecipes = getRelatedRecipes(recipe, mockRecipes, 3);
  const stepIcons = [<Soup key="pot" size={18} className="text-primary" />, <ChefHat key="chefhat" size={18} className="text-accent" />];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-10 text-sm bg-card hover:bg-muted transition-colors shadow-sm hover:shadow-md">
        <Link href="/">
          <ArrowLeft size={16} className="mr-2" /> Back to Recipes
        </Link>
      </Button>
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/40 mb-12">
        <div className="relative w-full h-[400px] md:h-[550px]">
          <Image
            src={recipe.image}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={`${recipe.name.toLowerCase().split(' ').slice(0, 2).join(' ')} gourmet food`}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
          {/* Subtle food texture overlay (replace with your own texture if available) */}
          <div className="absolute inset-0 bg-[url('/spices-texture.png')] opacity-10" aria-hidden="true" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-primary/90 text-primary-foreground text-base px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md hover:bg-inherit hover:text-inherit">
              <Globe size={16} className="mr-1" color="#3A86FF" /> {recipe.region}
            </Badge>
            <Badge className="bg-accent/90 text-accent-foreground text-base px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md hover:bg-inherit hover:text-inherit">
              <Flag size={15} className="mr-1" color="#E4572E" /> {recipe.country}
            </Badge>
            {dietaryTags.map(tag => (
              <Badge key={tag} className="bg-muted/80 text-foreground border border-accent/40 text-base px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md hover:bg-inherit hover:text-inherit">
                <ChefHat size={15} className="mr-1 text-accent" /> {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl font-headline text-white mb-4 drop-shadow-xl leading-tight">{recipe.name}</h1>
          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md max-w-4xl leading-relaxed">{recipe.description}</p>
        </div>
        <div className="absolute top-6 right-6 flex space-x-3 z-10">
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
      </div>
      {/* Details Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline text-primary mb-6 flex items-center">
          <Info size={28} className="mr-3 text-accent" /> Recipe Details
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-center">
          <div className="p-5 bg-muted/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-primary/40 flex flex-col items-center justify-center transform hover:scale-105">
            <Clock size={32} className="mb-3 text-primary" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Prep Time</p>
            <p className="text-xl font-semibold text-foreground">{recipe.prepTime}</p>
          </div>
          <div className="p-5 bg-muted/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-primary/40 flex flex-col items-center justify-center transform hover:scale-105">
            <Soup size={32} className="mb-3 text-accent" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Cook Time</p>
            <p className="text-xl font-semibold text-foreground">{recipe.cookTime}</p>
          </div>
          <div className="p-5 bg-muted/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-primary/40 flex flex-col items-center justify-center transform hover:scale-105">
            <Users size={32} className="mb-3 text-gold-600" style={{ color: '#FFD166' }} />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Servings</p>
            <p className="text-xl font-semibold text-foreground">{recipe.servings}</p>
          </div>
          <div className="p-5 bg-muted/50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-primary/40 flex flex-col items-center justify-center transform hover:scale-105">
            <Globe size={32} className="mb-3" color="#3A86FF" />
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Region</p>
            <p className="text-xl font-semibold text-foreground">{recipe.region}, {recipe.country}</p>
          </div>
        </div>
      </section>
      {/* Ingredients Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline text-primary mb-8 flex items-center">
          <Sprout size={28} className="mr-3 text-green-600" style={{ color: '#43AA8B' }} /> Ingredients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-[url('/spices-texture.png')] bg-repeat rounded-2xl p-4 md:p-8">
          {recipe.ingredients.map((ingredient: Ingredient) => (
            <div key={ingredient.name} className="flex items-center space-x-4 p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:bg-muted/60 bg-card/90 border border-border/20 hover:scale-[1.02]">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-inner border-2 border-accent/40">
                <Image
                  src={ingredient.image}
                  alt={ingredient.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={`${ingredient.name.toLowerCase()} ingredient food item photo`}
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="100px"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {ingredient.quantity} {ingredient.unit}
                </p>
                {ingredient.notes && (
                  <p className="text-xs text-accent italic mt-1">({ingredient.notes})</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Preparation Steps Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-headline text-primary mb-8 flex items-center">
          <Utensils size={28} className="mr-3 text-primary" /> Preparation Steps
        </h2>
        <ol className="space-y-6">
          {recipe.instructions.map((step: string, index: number) => (
            <li key={index} className="flex items-start space-x-4 p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:bg-muted/60 bg-card/90 border border-border/20 hover:scale-[1.01]">
              <div className="flex items-center justify-center w-16">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <span className="ml-2 flex items-center">
                  {stepIcons[index % stepIcons.length]}
                </span>
              </div>
              <p className="text-foreground/90 leading-relaxed text-base ml-2">{step}</p>
            </li>
          ))}
        </ol>
      </section>
      {/* Chef's Notes Section */}
      {recipe.notes && (
        <section className="mb-12">
          <Alert className="bg-accent/10 border-accent/30 text-accent-foreground p-8 rounded-xl shadow-inner relative">
            <ChefHat size={32} className="text-accent absolute left-6 top-7 hidden sm:block opacity-80" />
            <AlertTitle className="font-headline text-3xl text-foreground pl-0 sm:pl-16 mb-3">Chef's Culinary Notes</AlertTitle>
            <AlertDescription className="mt-2 text-foreground leading-relaxed text-base pl-0 sm:pl-16">
              {recipe.notes}
            </AlertDescription>
          </Alert>
        </section>
      )}
      {/* Related Recipes Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-headline text-primary mb-6 flex items-center">
          <Info size={24} className="mr-2 text-accent" /> Related Recipes
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar">
          {relatedRecipes.map(r => (
            <div key={r.id} className="min-w-[320px] max-w-xs flex-shrink-0">
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
