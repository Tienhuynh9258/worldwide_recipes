import { mockRecipes } from '@/lib/mock-data';
import type { Recipe, Ingredient } from '@/types';
import type { Metadata } from 'next';
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

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.',
    };
  }

  return {
    title: `${recipe.name} - ${recipe.region}, ${recipe.country}`,
    description: `Learn to make ${recipe.name} from ${recipe.region}, ${recipe.country}. ${recipe.description} Includes ingredients, cooking instructions, and chef tips.`,
    keywords: [
      recipe.name.toLowerCase(),
      recipe.region.toLowerCase(),
      recipe.country.toLowerCase(),
      'recipe',
      'cooking',
      'authentic',
      ...recipe.ingredients.slice(0, 5).map(ing => ing.name.toLowerCase()),
    ],
    openGraph: {
      title: `${recipe.name} Recipe - Worldwide Recipes`,
      description: recipe.description,
      images: [
        {
          url: recipe.image,
          width: 800,
          height: 600,
          alt: `${recipe.name} - ${recipe.region} cuisine`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.name} Recipe`,
      description: recipe.description,
      images: [recipe.image],
    },
  };
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
        <div className="bg-cream-gradient p-12 rounded-2xl shadow-spice border-2 border-spice-orange/20 max-w-2xl mx-auto">
          <Utensils size={80} className="mx-auto text-saffron-yellow mb-8 animate-bounce" />
                     <h1 className="text-headline-xl font-headline text-warm-gray mb-8">🍽️ Recipe Not Found!</h1>
           <p className="text-body-xl text-warm-gray/80 mb-12 max-w-2xl mx-auto">
             <span className="text-accent-script text-spice-orange">Oops!</span> The culinary masterpiece you're looking for seems to have disappeared into thin air! 👻
           </p>
          <Button asChild size="lg" className="bg-spice-orange hover:bg-tomato-red text-white shadow-spice hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Link href="/">
              <ArrowLeft size={20} className="mr-2" /> 🏠 Back to Recipe Collection
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  const dietaryTags = getDietaryTags(recipe);
  // Smarter related recipes
  const relatedRecipes = getRelatedRecipes(recipe, mockRecipes, 3);
  const stepIcons = [<Soup key="pot" size={20} className="text-herb-green" />, <ChefHat key="chefhat" size={20} className="text-saffron-yellow" />];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-10 text-sm bg-cream-gradient hover:bg-spice-orange text-warm-gray hover:text-white border-spice-orange/30 hover:border-spice-orange transition-all duration-300 shadow-spice hover:shadow-xl hover:scale-105">
        <Link href="/">
          <ArrowLeft size={16} className="mr-2" /> 🏠 Back to Recipes
        </Link>
      </Button>
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-spice border-2 border-spice-orange/20 mb-12">
        <div className="relative w-full h-[400px] md:h-[550px]">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            priority
            data-ai-hint={`${recipe.name.toLowerCase().split(' ').slice(0, 2).join(' ')} gourmet food`}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          />
          {/* Vibrant kitchen gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-spice-orange/20 to-transparent" />
          {/* Food texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-spice-orange/3 via-transparent to-herb-green/3 opacity-40" aria-hidden="true" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className="bg-herb-green/90 hover:bg-herb-green text-white text-base px-4 py-2 rounded-full flex items-center gap-2 shadow-spice hover:scale-105 transition-all duration-300">
              <Globe size={16} className="animate-spin" style={{animationDuration: '3s'}} /> 📍 {recipe.region}
            </Badge>
            <Badge className="bg-tomato-red/90 hover:bg-tomato-red text-white text-base px-4 py-2 rounded-full flex items-center gap-2 shadow-spice hover:scale-105 transition-all duration-300">
              <Flag size={15} /> 🏴 {recipe.country}
            </Badge>
            {dietaryTags.map(tag => (
              <Badge key={tag} className="bg-saffron-yellow/90 hover:bg-saffron-yellow text-warm-gray text-base px-4 py-2 rounded-full flex items-center gap-2 shadow-spice hover:scale-105 transition-all duration-300">
                <ChefHat size={15} className="animate-bounce" /> ✨ {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-display font-headline text-white mb-8 drop-shadow-2xl animate-pulse">
            {recipe.name} 🍽️
          </h1>
          <p className="text-body-xl text-white/95 drop-shadow-lg max-w-5xl text-center mx-auto">{recipe.description}</p>
        </div>
        <div className="absolute top-6 right-6 flex space-x-3 z-10">
          <Button variant="outline" size="icon" className="bg-white/20 hover:bg-spice-orange text-white hover:text-white border-white/40 hover:border-spice-orange backdrop-blur-md rounded-full shadow-spice hover:scale-110 transition-all duration-300">
            <Bookmark size={20} />
            <span className="sr-only">Bookmark</span>
          </Button>
          <Button variant="outline" size="icon" className="bg-white/20 hover:bg-herb-green text-white hover:text-white border-white/40 hover:border-herb-green backdrop-blur-md rounded-full shadow-spice hover:scale-110 transition-all duration-300">
            <Share2 size={20} />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="outline" size="icon" className="bg-white/20 hover:bg-saffron-yellow text-white hover:text-warm-gray border-white/40 hover:border-saffron-yellow backdrop-blur-md rounded-full shadow-spice hover:scale-110 transition-all duration-300">
            <Printer size={20} />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>
      {/* Details Section */}
      <section className="mb-12">
        <h2 className="text-headline-lg font-headline text-warm-gray mb-10 flex items-center gap-4">
          <Info size={36} className="text-spice-orange animate-bounce" /> 
          <span>Recipe Details</span>
          <span className="text-accent-script text-tomato-red">Essential Info 📊</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-gradient-to-br from-herb-green to-herb-green/80 rounded-xl shadow-spice hover:shadow-xl transition-all duration-300 border-2 border-herb-green/20 hover:border-herb-green flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer">
            <Clock size={36} className="mb-4 text-white animate-pulse" />
            <p className="text-sm font-bold text-white/90 uppercase tracking-wider mb-2">⏱️ Prep Time</p>
            <p className="text-2xl font-bold text-white">{recipe.prepTime}</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-tomato-red to-tomato-red/80 rounded-xl shadow-spice hover:shadow-xl transition-all duration-300 border-2 border-tomato-red/20 hover:border-tomato-red flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer">
            <Soup size={36} className="mb-4 text-white animate-pulse" />
            <p className="text-sm font-bold text-white/90 uppercase tracking-wider mb-2">🔥 Cook Time</p>
            <p className="text-2xl font-bold text-white">{recipe.cookTime}</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-saffron-yellow to-saffron-yellow/80 rounded-xl shadow-spice hover:shadow-xl transition-all duration-300 border-2 border-saffron-yellow/20 hover:border-saffron-yellow flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer">
            <Users size={36} className="mb-4 text-white animate-pulse" />
            <p className="text-sm font-bold text-white/90 uppercase tracking-wider mb-2">👥 Servings</p>
            <p className="text-2xl font-bold text-white">{recipe.servings}</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-spice-orange to-spice-orange/80 rounded-xl shadow-spice hover:shadow-xl transition-all duration-300 border-2 border-spice-orange/20 hover:border-spice-orange flex flex-col items-center justify-center transform hover:scale-110 cursor-pointer">
            <Globe size={36} className="mb-4 text-white animate-spin" style={{animationDuration: '3s'}} />
            <p className="text-sm font-bold text-white/90 uppercase tracking-wider mb-2">🌍 Origin</p>
            <p className="text-lg font-bold text-white">{recipe.region}</p>
          </div>
        </div>
      </section>
      {/* Ingredients Section */}
      <section className="mb-12">
        <h2 className="text-headline-lg font-headline text-warm-gray mb-10 flex items-center gap-4">
          <Sprout size={36} className="text-herb-green animate-bounce" /> 
          <span>Fresh Ingredients</span>
          <span className="text-accent-script text-herb-green">Farm to Table 🥬</span>
        </h2>
        <div className="bg-cream-gradient rounded-2xl p-8 shadow-spice border-2 border-spice-orange/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipe.ingredients.map((ingredient: Ingredient) => (
              <div key={ingredient.name} className="flex items-center space-x-4 p-5 rounded-xl shadow-herb transition-all duration-300 ease-in-out hover:bg-white/80 bg-white/60 border-2 border-spice-orange/10 hover:border-spice-orange/30 hover:scale-105 cursor-pointer group">
                <div className="relative w-18 h-18 rounded-full overflow-hidden shadow-spice border-3 border-spice-orange/30 group-hover:border-spice-orange">
                  <Image
                    src={ingredient.image}
                    alt={ingredient.name}
                    fill
                    data-ai-hint={`${ingredient.name.toLowerCase()} ingredient food item photo`}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-xl text-warm-gray group-hover:text-spice-orange transition-colors duration-300">{ingredient.name}</h3>
                  <p className="text-base text-warm-gray/80 font-medium">
                    📏 {ingredient.quantity} {ingredient.unit}
                  </p>
                  {ingredient.notes && (
                    <p className="text-sm text-herb-green italic mt-1 font-medium">✨ ({ingredient.notes})</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Preparation Steps Section */}
      <section className="mb-12">
        <h2 className="text-headline-lg font-headline text-warm-gray mb-10 flex items-center gap-4">
          <Utensils size={36} className="text-spice-orange animate-bounce" /> 
          <span>Cooking Steps</span>
          <span className="text-accent-script text-spice-orange">Master Chef Guide 👨‍🍳</span>
        </h2>
        <div className="space-y-6">
          {recipe.instructions.map((step: string, index: number) => (
            <div key={index} className="flex items-start space-x-6 p-6 rounded-xl shadow-spice transition-all duration-300 ease-in-out hover:bg-soft-peach/30 bg-white border-2 border-spice-orange/20 hover:border-spice-orange/40 hover:scale-[1.02] group">
              <div className="flex items-center justify-center min-w-[4rem]">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-spice-orange to-tomato-red text-white font-bold text-xl shadow-spice group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-spice-orange uppercase tracking-wider">Step {index + 1}</span>
                  {stepIcons[index % stepIcons.length]}
                </div>
                <p className="text-warm-gray leading-relaxed text-lg font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Chef's Notes Section */}
      {recipe.notes && (
        <section className="mb-12">
          <div className="bg-kitchen-gradient p-8 rounded-xl shadow-spice border-2 border-spice-orange/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-saffron-yellow/5 via-transparent to-tomato-red/5 opacity-60" aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                  <ChefHat size={32} className="text-white animate-bounce" />
                </div>
                                 <h3 className="text-headline-md font-headline text-white drop-shadow-lg">
                   <span className="text-accent-script">Chef's Secret Tips</span> 👨‍🍳
                 </h3>
              </div>
                             <p className="text-food-quote text-white/95 drop-shadow-md text-xl">
                 "{recipe.notes}"
               </p>
            </div>
          </div>
        </section>
      )}
      {/* Related Recipes Section */}
      <section className="mb-8">
        <h2 className="text-headline-lg font-headline text-warm-gray mb-10 flex items-center gap-4">
          <Info size={36} className="text-herb-green animate-pulse" /> 
          <span>Discover Similar Recipes</span>
          <span className="text-accent-script text-herb-green">More Delights 🔍</span>
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 trending-scroll">
          {relatedRecipes.map(r => (
            <div key={r.id} className="min-w-[320px] max-w-xs flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      </section>

      {/* Structured Data for Recipe SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: recipe.name,
            description: recipe.description,
            image: recipe.image,
            author: {
              '@type': 'Organization',
              name: 'Worldwide Recipes',
            },
            recipeYield: recipe.servings,
            prepTime: `PT${recipe.prepTime?.match(/\d+/)?.[0] || 0}M`,
            cookTime: `PT${recipe.cookTime?.match(/\d+/)?.[0] || 0}M`,
            totalTime: `PT${(parseInt(recipe.prepTime?.match(/\d+/)?.[0] || '0') + parseInt(recipe.cookTime?.match(/\d+/)?.[0] || '0'))}M`,
            recipeCategory: 'World Cuisine',
            recipeCuisine: `${recipe.region}, ${recipe.country}`,
            keywords: [recipe.name, recipe.region, recipe.country, 'recipe', 'cooking'].join(', '),
            nutrition: {
              '@type': 'NutritionInformation',
              servingSize: '1 serving',
            },
            recipeIngredient: recipe.ingredients.map(
              (ing: Ingredient) => `${ing.quantity} ${ing.unit} ${ing.name}`.trim()
            ),
            recipeInstructions: recipe.instructions.map((instruction: string, index: number) => ({
              '@type': 'HowToStep',
              name: `Step ${index + 1}`,
              text: instruction,
              position: index + 1,
            })),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: 4.5,
              reviewCount: Math.floor(Math.random() * 100) + 50,
            },
          }),
        }}
      />
    </div>
  );
}
