
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
  },
  {
    id: '4',
    name: 'Tacos al Pastor',
    region: 'Central Mexico',
    country: 'Mexico',
    image: 'https://placehold.co/600x400.png',
    description: 'Spit-grilled pork marinated in a blend of dried chilies, spices, and pineapple.',
    ingredients: [
      { name: 'Pork Shoulder', quantity: '1', unit: 'kg', image: 'https://placehold.co/100x100.png', notes: 'Thinly sliced' },
      { name: 'Pineapple', quantity: '1/2', unit: 'medium', image: 'https://placehold.co/100x100.png', notes: 'Sliced, plus chunks for serving' },
      { name: 'Corn Tortillas', quantity: '20', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Small' },
      { name: 'Onion', quantity: '1', unit: 'large', image: 'https://placehold.co/100x100.png', notes: 'Diced, for serving' },
      { name: 'Cilantro', quantity: '1', unit: 'bunch', image: 'https://placehold.co/100x100.png', notes: 'Chopped, for serving' },
      { name: 'Achiote Paste', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Guajillo Chilies', quantity: '3', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Seeded and rehydrated' },
      { name: 'Ancho Chilies', quantity: '2', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Seeded and rehydrated' },
      { name: 'Orange Juice', quantity: '1/2', unit: 'cup', image: 'https://placehold.co/100x100.png' },
      { name: 'White Vinegar', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/100x100.png' },
      { name: 'Cumin', quantity: '1', unit: 'tsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Oregano', quantity: '1', unit: 'tsp', image: 'https://placehold.co/100x100.png' }
    ],
    instructions: [
      'Blend rehydrated chilies, achiote paste, orange juice, vinegar, cumin, and oregano to make the marinade.',
      'Marinate sliced pork for at least 4 hours, preferably overnight.',
      'Traditionally, pork is cooked on a vertical spit. For home cooking, layer marinated pork and pineapple slices in a baking dish or on skewers.',
      'Roast at 180°C (350°F) until cooked through and slightly charred, about 30-45 minutes. Or grill on high heat.',
      'Warm corn tortillas.',
      'Thinly slice the cooked pork.',
      'Serve pork on tortillas, topped with diced pineapple, onion, and cilantro. Add your favorite salsa.'
    ],
    prepTime: '30 mins + marination',
    cookTime: '45 mins',
    servings: '6-8',
    notes: 'A vertical skewer helps mimic the traditional cooking method.'
  },
  {
    id: '5',
    name: 'Beef Rendang',
    region: 'Minangkabau (Sumatra)',
    country: 'Indonesia',
    image: 'https://placehold.co/600x400.png',
    description: 'A rich and tender coconut beef stew, slow-cooked to perfection with aromatic spices.',
    ingredients: [
      { name: 'Beef Chuck', quantity: '1', unit: 'kg', image: 'https://placehold.co/100x100.png', notes: 'Cut into 2-inch cubes' },
      { name: 'Coconut Milk', quantity: '800', unit: 'ml', image: 'https://placehold.co/100x100.png', notes: 'Full fat' },
      { name: 'Lemongrass', quantity: '3', unit: 'stalks', image: 'https://placehold.co/100x100.png', notes: 'Bruised' },
      { name: 'Galangal', quantity: '2', unit: 'inch piece', image: 'https://placehold.co/100x100.png', notes: 'Sliced' },
      { name: 'Turmeric Leaves', quantity: '2', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Optional, tied in a knot' },
      { name: 'Kaffir Lime Leaves', quantity: '4', unit: '', image: 'https://placehold.co/100x100.png' },
      { name: 'Red Chilies', quantity: '5-10', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Adjust to spice preference, blended' },
      { name: 'Shallots', quantity: '200', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Blended' },
      { name: 'Garlic', quantity: '5', unit: 'cloves', image: 'https://placehold.co/100x100.png', notes: 'Blended' },
      { name: 'Ginger', quantity: '1', unit: 'inch piece', image: 'https://placehold.co/100x100.png', notes: 'Blended' },
      { name: 'Coriander Powder', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Toasted Coconut Flakes (Kerisik)', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/100x100.png' }
    ],
    instructions: [
      'Blend shallots, garlic, ginger, red chilies, and coriander powder into a spice paste.',
      'In a large pot or Dutch oven, combine beef, spice paste, coconut milk, lemongrass, galangal, turmeric leaves (if using), and kaffir lime leaves.',
      'Bring to a boil, then reduce heat to low and simmer uncovered, stirring occasionally.',
      'Cook for 2-3 hours, or until the liquid has mostly evaporated and the beef is very tender and dark brown. The oil should start to separate from the sauce.',
      'Stir in toasted coconut flakes (kerisik) and cook for another 15-20 minutes, stirring more frequently to prevent sticking.',
      'The rendang is ready when the sauce is very thick and has caramelized around the beef.',
      'Serve hot with steamed rice.'
    ],
    prepTime: '30 mins',
    cookTime: '2.5-3.5 hours',
    servings: '6',
    notes: 'Rendang gets better with time; it can be made a day ahead.'
  },
  {
    id: '6',
    name: 'Pad Thai',
    region: 'Central Thailand',
    country: 'Thailand',
    image: 'https://placehold.co/600x400.png',
    description: 'A popular Thai stir-fried noodle dish with a sweet, savory, and tangy flavor profile.',
    ingredients: [
      { name: 'Rice Noodles', quantity: '200', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Flat, medium width' },
      { name: 'Shrimp or Tofu', quantity: '150', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Peeled shrimp or firm tofu, cubed' },
      { name: 'Eggs', quantity: '2', unit: '', image: 'https://placehold.co/100x100.png', notes: 'Lightly beaten' },
      { name: 'Garlic Chives', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/100x100.png', notes: 'Chopped, or scallions' },
      { name: 'Bean Sprouts', quantity: '1', unit: 'cup', image: 'https://placehold.co/100x100.png' },
      { name: 'Roasted Peanuts', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/100x100.png', notes: 'Crushed, for garnish' },
      { name: 'Tamarind Paste', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Fish Sauce', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Palm Sugar', quantity: '2', unit: 'tbsp', image: 'https://placehold.co/100x100.png', notes: 'Or brown sugar' },
      { name: 'Soy Sauce', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Chili Flakes', quantity: '1/2', unit: 'tsp', image: 'https://placehold.co/100x100.png', notes: 'Optional, for garnish' },
      { name: 'Lime Wedges', quantity: '', unit: '', image: 'https://placehold.co/100x100.png', notes: 'For serving' }
    ],
    instructions: [
      'Soak rice noodles in warm water until pliable, then drain. Do not oversoak.',
      'Prepare the Pad Thai sauce: mix tamarind paste, fish sauce, palm sugar, and soy sauce in a small bowl. Adjust to taste.',
      'Heat oil in a wok or large skillet over medium-high heat. Add shrimp or tofu and cook until done. Remove and set aside.',
      'Add a little more oil if needed. Add minced garlic (if using) and stir-fry for a few seconds until fragrant.',
      'Push garlic to one side, pour in beaten eggs. Scramble lightly until almost set.',
      'Add drained noodles and Pad Thai sauce to the wok. Stir-fry quickly, tossing to coat noodles evenly with sauce.',
      'Add cooked shrimp/tofu, half the bean sprouts, and garlic chives. Continue to stir-fry for 1-2 minutes until everything is heated through and noodles are tender.',
      'Serve immediately, garnished with remaining bean sprouts, crushed peanuts, chili flakes (if using), and lime wedges on the side.'
    ],
    prepTime: '25 mins',
    cookTime: '10 mins',
    servings: '2-3',
  },
  {
    id: '7',
    name: 'Moussaka',
    region: 'Balkans/Eastern Mediterranean',
    country: 'Greece',
    image: 'https://placehold.co/600x400.png',
    description: 'A layered oven-bake dish made with eggplant, minced meat, and a creamy béchamel sauce.',
    ingredients: [
      { name: 'Eggplants', quantity: '2', unit: 'large', image: 'https://placehold.co/100x100.png', notes: 'Sliced 1/2 inch thick' },
      { name: 'Potatoes', quantity: '2', unit: 'medium', image: 'https://placehold.co/100x100.png', notes: 'Optional, thinly sliced' },
      { name: 'Minced Lamb or Beef', quantity: '500', unit: 'g', image: 'https://placehold.co/100x100.png' },
      { name: 'Onion', quantity: '1', unit: 'large', image: 'https://placehold.co/100x100.png', notes: 'Chopped' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', image: 'https://placehold.co/100x100.png', notes: 'Minced' },
      { name: 'Chopped Tomatoes', quantity: '400', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Canned' },
      { name: 'Red Wine', quantity: '1/2', unit: 'cup', image: 'https://placehold.co/100x100.png', notes: 'Optional' },
      { name: 'Cinnamon', quantity: '1/2', unit: 'tsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Oregano', quantity: '1', unit: 'tsp', image: 'https://placehold.co/100x100.png' },
      { name: 'Butter', quantity: '100', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'For béchamel' },
      { name: 'Flour', quantity: '100', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'For béchamel' },
      { name: 'Milk', quantity: '1', unit: 'litre', image: 'https://placehold.co/100x100.png', notes: 'Warm, for béchamel' },
      { name: 'Egg Yolks', quantity: '2', unit: '', image: 'https://placehold.co/100x100.png', notes: 'For béchamel' },
      { name: 'Parmesan Cheese', quantity: '50', unit: 'g', image: 'https://placehold.co/100x100.png', notes: 'Grated, for béchamel and topping' }
    ],
    instructions: [
      'Salt eggplant slices and let them sit for 30 minutes to draw out moisture. Pat dry. Pan-fry or bake eggplant (and potato, if using) slices until lightly browned. Set aside.',
      'For meat sauce: Sauté onion and garlic until soft. Add minced meat and cook until browned. Drain excess fat.',
      'Stir in chopped tomatoes, red wine (if using), cinnamon, and oregano. Simmer for 20-30 minutes until sauce thickens. Season with salt and pepper.',
      'For béchamel: Melt butter in a saucepan. Whisk in flour and cook for 1-2 minutes. Gradually whisk in warm milk until smooth. Cook, stirring, until sauce thickens.',
      'Remove from heat. Whisk in egg yolks and half the Parmesan cheese. Season with salt, pepper, and a pinch of nutmeg (optional).',
      'Assemble: Layer half the eggplant/potato slices in a baking dish. Top with meat sauce. Layer remaining eggplant/potatoes.',
      'Pour béchamel sauce over the top. Sprinkle with remaining Parmesan cheese.',
      'Bake at 180°C (350°F) for 45-60 minutes, or until golden brown and bubbling. Let it rest for 15-20 minutes before serving.'
    ],
    prepTime: '1 hour',
    cookTime: '1.5 hours',
    servings: '6-8',
    notes: 'Letting the moussaka rest is crucial for it to hold its shape when sliced.'
  }
];

export const commonIngredients = Array.from(new Set(mockRecipes.flatMap(recipe => recipe.ingredients.map(ing => ing.name.split(" ")[0].replace(/,/g, ''))))).sort();
export const commonRegions = Array.from(new Set(mockRecipes.map(recipe => recipe.region))).sort();
export const commonCountries = Array.from(new Set(mockRecipes.map(recipe => recipe.country))).sort();

