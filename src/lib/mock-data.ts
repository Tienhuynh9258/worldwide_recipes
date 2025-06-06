import type { Recipe } from '@/types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    region: 'Lazio',
    country: 'Italy',
    image: 'https://placehold.co/600x400.png',
    description: 'A classic Roman pasta dish made with eggs, hard cheese, cured pork, and black pepper.',
    ingredients: [
      { name: 'Spaghetti', quantity: '400', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Bronze-cut if possible' },
      { name: 'Guanciale', quantity: '150', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Or pancetta' },
      { name: 'Eggs', quantity: '3', unit: 'large', image: 'https://placehold.co/100x100.png', notes: 'Room temperature' },
      { name: 'Pecorino Romano', quantity: '50', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Freshly grated' },
      { name: 'Black Pepper', quantity: 'to taste', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Freshly ground' },
    ],
    instructions: [
      'Cook the spaghetti in salted boiling water until al dente.',
      'While pasta cooks, fry guanciale in a pan until crispy. Remove guanciale, leave fat in pan.',
      'In a bowl, whisk eggs and Pecorino Romano. Add a generous amount of black pepper.',
      'Drain pasta, reserving some pasta water. Add pasta to the pan with guanciale fat. Toss to coat.',
      'Remove pan from heat. Quickly mix in egg and cheese mixture. If too thick, add a bit of pasta water.',
      'Serve immediately with more grated Pecorino and black pepper.'
    ],
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: '4',
    notes: 'Ensure the pan is off the heat when adding eggs to prevent scrambling.'
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    region: 'Punjab (disputed)',
    country: 'India / UK',
    image: 'https://placehold.co/600x400.png',
    description: 'Chunks of roasted marinated chicken in a spiced curry sauce.',
    ingredients: [
      { name: 'Chicken Breast', quantity: '500', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Cut into bite-sized pieces' },
      { name: 'Yogurt', quantity: '150', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Plain, for marinade' },
      { name: 'Tikka Masala Paste', quantity: '2', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Onion', quantity: '1', unit: 'medium', image: 'https://placehold.co/100x100.png', notes: 'Finely chopped' },
      { name: 'Tomato Puree', quantity: '400', unit: 'g', image: 'https://placehold.co/100x100.png' },
      { name: 'Heavy Cream', quantity: '100', unit: 'ml', image: 'https://placehold.co/100x100.png' },
      { name: 'Garam Masala', quantity: '1', unit: 'tsp', image: 'https://placehold.co/100x100.png' },
    ],
    instructions: [
      'Marinate chicken with yogurt and tikka masala paste for at least 1 hour (preferably overnight).',
      'Grill or pan-fry chicken pieces until cooked through and slightly charred. Set aside.',
      'In a large pan, sauté chopped onion until soft.',
      'Add remaining tikka masala paste (if any), tomato puree, and garam masala. Cook for 5 minutes.',
      'Stir in heavy cream and simmer for another 5 minutes.',
      'Add cooked chicken to the sauce. Simmer gently for 10 minutes to allow flavors to meld.',
      'Serve hot with naan bread or rice.'
    ],
    prepTime: '20 mins + marination',
    cookTime: '30 mins',
    servings: '4',
  },
  {
    id: '3',
    name: 'Sushi Rolls (Maki)',
    region: 'Kanto (Edo)',
    country: 'Japan',
    image: 'https://placehold.co/600x400.png',
    description: 'Classic Japanese vinegared rice rolls with various fillings, wrapped in seaweed.',
    ingredients: [
      { name: 'Sushi Rice', quantity: '2', unit: 'cups', image: 'https://placehold.co/100x100.png', notes: 'Short grain' },
      { name: 'Nori Sheets', quantity: '4-5', unit: '', image: 'https://placehold.co/100x100.png' },
      { name: 'Rice Vinegar', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/100x100.png' },
      { name: 'Sugar', quantity: '2', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Salt', quantity: '1', unit: 'tsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Cucumber', quantity: '1/2', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Julienned' },
      { name: 'Avocado', quantity: '1', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Sliced' },
      { name: 'Cooked Shrimp or Crab', quantity: '100', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Optional' }
    ],
    instructions: [
      'Cook sushi rice according to package directions. While rice is hot, mix in rice vinegar, sugar, and salt mixture. Let cool.',
      'Place a nori sheet shiny side down on a bamboo sushi mat.',
      'Wet your hands and spread a thin layer of sushi rice evenly over the nori, leaving a 1-inch border at the top.',
      'Arrange your fillings (cucumber, avocado, shrimp/crab) in a line across the center of the rice.',
      'Carefully roll the bamboo mat, pressing firmly to create a tight roll. Moisten the nori border with water to seal.',
      'Remove the roll from the mat. Wet a sharp knife and slice the roll into 6-8 pieces.',
      'Serve with soy sauce, wasabi, and pickled ginger.'
    ],
    prepTime: '45 mins',
    cookTime: '20 mins (for rice)',
    servings: '2-3 (makes 4-5 rolls)',
  }
];

export const commonIngredients = Array.from(new Set(mockRecipes.flatMap(recipe => recipe.ingredients.map(ing => ing.name.split(" ")[0]))));
export const commonRegions = Array.from(new Set(mockRecipes.map(recipe => recipe.region)));
export const commonCountries = Array.from(new Set(mockRecipes.map(recipe => recipe.country)));
