
import type { Recipe } from '@/types';

export interface CategorizedIngredient {
  name: string;
}

export interface IngredientGroup {
  groupName: string;
  ingredients: CategorizedIngredient[];
}

// Ensure all ingredients used in mockRecipes are represented here for filtering
export const categorizedIngredientsData: IngredientGroup[] = [
  {
    groupName: 'Protein',
    ingredients: [
      { name: 'Chicken Breast' },
      { name: 'Beef Chuck' },
      { name: 'Pork Shoulder' },
      { name: 'Minced Lamb or Beef' },
      { name: 'Shrimp' },
      { name: 'Tofu' },
      { name: 'Eggs' },
      { name: 'Guanciale' },
      { name: 'Pecorino Romano' },
      { name: 'Parmesan Cheese' },
    ],
  },
  {
    groupName: 'Carbohydrate',
    ingredients: [
      { name: 'Spaghetti' },
      { name: 'Sushi Rice' },
      { name: 'Rice Noodles' },
      { name: 'Potatoes' },
      { name: 'Flour' },
      { name: 'Corn Tortillas' },
      { name: 'Nori Sheets' },
      { name: 'Sugar' }, // For sushi rice seasoning & Pad Thai
      { name: 'Palm Sugar' },
    ],
  },
  {
    groupName: 'Fat',
    ingredients: [
      { name: 'Coconut Milk' },
      { name: 'Heavy Cream' },
      { name: 'Butter' },
      { name: 'Yogurt' }, 
      { name: 'Olive Oil' },
      { name: 'Toasted Coconut Flakes (Kerisik)'}, // Contains fat
    ],
  },
  {
    groupName: 'Vitamins & Minerals (Vegetables, Fruits, Spices)',
    ingredients: [
      { name: 'Onion' },
      { name: 'Garlic' },
      { name: 'Tomato Puree' },
      { name: 'Chopped Tomatoes' },
      { name: 'Pineapple' },
      { name: 'Cucumber' },
      { name: 'Avocado' },
      { name: 'Cilantro' },
      { name: 'Lemongrass' },
      { name: 'Ginger' },
      { name: 'Black Pepper' },
      { name: 'Tikka Masala Paste' },
      { name: 'Garam Masala' },
      { name: 'Rice Vinegar' },
      { name: 'Salt' },
      { name: 'Achiote Paste' },
      { name: 'Guajillo Chilies' },
      { name: 'Ancho Chilies' },
      { name: 'Orange Juice' },
      { name: 'White Vinegar' },
      { name: 'Cumin' },
      { name: 'Oregano' }, // Also for Tacos & Moussaka
      { name: 'Galangal' },
      { name: 'Turmeric Leaves' },
      { name: 'Kaffir Lime Leaves' },
      { name: 'Red Chilies' },
      { name: 'Shallots' },
      { name: 'Coriander Powder' },
      { name: 'Garlic Chives' },
      { name: 'Bean Sprouts' },
      { name: 'Roasted Peanuts' },
      { name: 'Tamarind Paste' },
      { name: 'Fish Sauce' },
      { name: 'Soy Sauce' },
      { name: 'Chili Flakes' },
      { name: 'Lime Wedges' },
      { name: 'Eggplants' }, // For Moussaka
      { name: 'Red Wine' }, // For Moussaka meat sauce
      { name: 'Cinnamon' }, // For Moussaka meat sauce
      // Add any other distinct spices/herbs/veg from recipes
    ].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 30), // Keep list manageable but comprehensive for example
  },
];


export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    region: 'Lazio',
    country: 'Italy',
    image: 'https://placehold.co/800x600.png',
    description: 'A classic Roman pasta dish made with eggs, hard cheese, cured pork, and black pepper. Authentic and rich in flavor.',
    ingredients: [
      { name: 'Spaghetti', quantity: '400', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Bronze-cut if possible' },
      { name: 'Guanciale', quantity: '150', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Or pancetta' },
      { name: 'Eggs', quantity: '3', unit: 'large', image: 'https://placehold.co/150x150.png', notes: 'Room temperature, plus 1 yolk' },
      { name: 'Pecorino Romano', quantity: '50', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Freshly grated' },
      { name: 'Black Pepper', quantity: 'to taste', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Freshly ground coarse' },
      { name: 'Olive Oil', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Salt', quantity: 'to taste', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For pasta water' },
    ],
    instructions: [
      'Bring a large pot of salted water to a boil. Cook the spaghetti until al dente according to package directions.',
      'While pasta cooks, heat olive oil in a large skillet over medium heat. Add guanciale and cook until golden brown and crispy. Remove guanciale with a slotted spoon and set aside, leaving the rendered fat in the skillet.',
      'In a medium bowl, whisk together the eggs, extra egg yolk, and grated Pecorino Romano cheese. Season generously with freshly ground black pepper.',
      'Once the pasta is cooked, reserve about 1 cup of the pasta water, then drain the spaghetti.',
      'Add the drained spaghetti to the skillet with the guanciale fat. Toss well to coat the pasta.',
      'Remove the skillet from the heat. Quickly pour in the egg and cheese mixture, stirring vigorously and continuously to create a creamy sauce. If the sauce is too thick, add a little of the reserved pasta water until it reaches the desired consistency. Be careful not to scramble the eggs; the residual heat from the pasta and skillet should be enough.',
      'Stir in the crispy guanciale. Serve immediately, garnished with more grated Pecorino Romano and a generous crack of black pepper.'
    ],
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: '4',
    notes: 'The key to a creamy Carbonara is working quickly off the heat when adding the egg mixture. Ensure your Pecorino is finely grated.'
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    region: 'Punjab (disputed)',
    country: 'India / UK',
    image: 'https://placehold.co/800x600.png',
    description: 'Chunks of roasted marinated chicken in a spiced, creamy, and orange-colored curry sauce. A global favorite.',
    ingredients: [
      { name: 'Chicken Breast', quantity: '500', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Cut into 1-inch pieces' },
      { name: 'Yogurt', quantity: '150', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Plain, full-fat for marinade' },
      { name: 'Tikka Masala Paste', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Good quality store-bought or homemade' },
      { name: 'Onion', quantity: '1', unit: 'large', image: 'https://placehold.co/150x150.png', notes: 'Finely chopped' },
      { name: 'Tomato Puree', quantity: '400', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Canned, or passata' },
      { name: 'Heavy Cream', quantity: '150', unit: 'ml', image: 'https://placehold.co/150x150.png', notes: 'Or coconut cream for dairy-free' },
      { name: 'Garam Masala', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Ginger', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Freshly grated or minced' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', image: 'https://placehold.co/150x150.png', notes: 'Minced' },
      { name: 'Olive Oil', quantity: '2', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Or vegetable oil' },
      { name: 'Cilantro', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'Fresh, chopped for garnish' },
       { name: 'Salt', quantity: 'to taste', unit: '', image: 'https://placehold.co/150x150.png' },
    ],
    instructions: [
      'In a bowl, combine chicken pieces, yogurt, 2 tablespoons of tikka masala paste, grated ginger, and minced garlic. Mix well, cover, and marinate in the refrigerator for at least 1 hour, or preferably overnight.',
      'Preheat grill or oven to 200°C (400°F). Thread marinated chicken onto skewers (if using) or spread on a baking sheet. Grill or bake for 15-20 minutes, or until cooked through and slightly charred. Set aside.',
      'Heat olive oil in a large pan or Dutch oven over medium heat. Add chopped onion and cook until softened, about 5-7 minutes.',
      'Stir in the remaining 1 tablespoon of tikka masala paste (or more to taste) and cook for 1 minute until fragrant.',
      'Add tomato puree and garam masala. Bring to a simmer and cook for 10 minutes, stirring occasionally, until the sauce thickens slightly.',
      'Reduce heat to low and stir in the heavy cream. Add the cooked chicken pieces to the sauce. Simmer gently for another 5-10 minutes to allow flavors to meld. Season with salt to taste.',
      'Serve hot, garnished with fresh cilantro, alongside basmati rice or naan bread.'
    ],
    prepTime: '20 mins + marination',
    cookTime: '35 mins',
    servings: '4',
    notes: 'For a richer flavor, use chicken thighs. You can adjust the amount of cream for desired richness.'
  },
  {
    id: '3',
    name: 'Sushi Rolls (Maki)',
    region: 'Kanto (Edo)',
    country: 'Japan',
    image: 'https://placehold.co/800x600.png',
    description: 'Classic Japanese vinegared rice rolls with various fillings, wrapped in seaweed (nori). A delicate art form.',
    ingredients: [
      { name: 'Sushi Rice', quantity: '2', unit: 'cups', image: 'https://placehold.co/150x150.png', notes: 'Japanese short grain' },
      { name: 'Nori Sheets', quantity: '5-6', unit: '', image: 'https://placehold.co/150x150.png' },
      { name: 'Rice Vinegar', quantity: '1/3', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'For sushi seasoning' },
      { name: 'Sugar', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'For sushi seasoning' },
      { name: 'Salt', quantity: '1.5', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'For sushi seasoning' },
      { name: 'Cucumber', quantity: '1', unit: 'medium', image: 'https://placehold.co/150x150.png', notes: 'Seeded and julienned' },
      { name: 'Avocado', quantity: '1', unit: 'large', image: 'https://placehold.co/150x150.png', notes: 'Ripe, sliced' },
      { name: 'Shrimp', quantity: '150', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Cooked and peeled, or imitation crab' },
      { name: 'Soy Sauce', quantity: '', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For serving' },
      { name: 'Wasabi', quantity: '', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For serving' },
      { name: 'Pickled Ginger (Gari)', quantity: '', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For serving' },
    ],
    instructions: [
      'Rinse sushi rice thoroughly until water runs clear. Cook according to package directions (usually 1:1.1 rice to water ratio).',
      'While rice is cooking, prepare sushi seasoning: in a small saucepan, gently heat rice vinegar, sugar, and salt until sugar and salt dissolve. Do not boil. Let cool.',
      'Once rice is cooked, transfer it to a large, non-metallic bowl. Gradually pour the sushi seasoning over the hot rice, using a cutting motion with a rice paddle or spatula to mix and separate the grains. Fan the rice while mixing to cool it down quickly and give it a glossy sheen. Cover with a damp cloth until ready to use.',
      'Place a bamboo sushi mat (makisu) on a clean surface. Place a nori sheet shiny side down on the mat, with the lines parallel to the bamboo sticks.',
      'Dip your hands in a bowl of water mixed with a little rice vinegar (tezu) to prevent rice from sticking. Take about 3/4 cup of seasoned sushi rice and spread it evenly over the nori, leaving a 1-inch border at the top edge. Do not press the rice down too hard.',
      'Arrange your fillings (e.g., cucumber, avocado, shrimp/crab) in a line across the center of the rice, about 1 inch from the bottom edge.',
      'Starting from the bottom edge (closest to you), use the bamboo mat to lift the nori and rice over the filling. Roll it forward tightly and evenly. As you roll, gently press the mat to shape the roll. Moisten the top border of the nori with a little water or a few grains of rice to help seal the roll.',
      'Remove the roll from the mat. With a very sharp, wet knife, slice the roll into 6-8 even pieces. Wipe the knife with a damp cloth between cuts for clean slices.',
      'Arrange sushi rolls on a platter and serve immediately with soy sauce, wasabi, and pickled ginger.'
    ],
    prepTime: '1 hour (includes rice cooling)',
    cookTime: '20 mins (for rice)',
    servings: '3-4 (makes 5-6 rolls)',
    notes: 'Don’t overfill your rolls. A sharp knife is essential for clean cuts. Practice makes perfect!'
  },
  {
    id: '4',
    name: 'Tacos al Pastor',
    region: 'Central Mexico',
    country: 'Mexico',
    image: 'https://placehold.co/800x600.png',
    description: 'Spit-grilled pork marinated in a blend of dried chilies, spices, and pineapple. Served on small corn tortillas.',
    ingredients: [
      { name: 'Pork Shoulder', quantity: '1', unit: 'kg', image: 'https://placehold.co/150x150.png', notes: 'Boneless, thinly sliced (1/4 inch)' },
      { name: 'Pineapple', quantity: '1', unit: 'small', image: 'https://placehold.co/150x150.png', notes: 'Peeled, cored, 1/2 sliced for marinade, 1/2 diced for serving' },
      { name: 'Corn Tortillas', quantity: '24-30', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Small street taco size' },
      { name: 'Onion', quantity: '1', unit: 'large white', image: 'https://placehold.co/150x150.png', notes: 'Finely diced, for serving' },
      { name: 'Cilantro', quantity: '1', unit: 'large bunch', image: 'https://placehold.co/150x150.png', notes: 'Fresh, chopped, for serving' },
      { name: 'Achiote Paste', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Guajillo Chilies', quantity: '4', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Dried, stemmed and seeded' },
      { name: 'Ancho Chilies', quantity: '2', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Dried, stemmed and seeded' },
      { name: 'Orange Juice', quantity: '1/2', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'Freshly squeezed' },
      { name: 'White Vinegar', quantity: '1/4', unit: 'cup', image: 'https://placehold.co/150x150.png' },
      { name: 'Garlic', quantity: '4', unit: 'cloves', image: 'https://placehold.co/150x150.png', notes: 'Peeled' },
      { name: 'Cumin', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Ground' },
      { name: 'Oregano', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Mexican oregano preferred' },
      { name: 'Salt', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Black Pepper', quantity: '1/2', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Ground' },
      { name: 'Lime Wedges', quantity: '', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For serving' },
    ],
    instructions: [
      'Rehydrate dried guajillo and ancho chilies by soaking them in hot water for 20-30 minutes until softened. Drain, reserving a little soaking liquid.',
      'In a blender, combine the rehydrated chilies, achiote paste, orange juice, white vinegar, garlic cloves, cumin, oregano, salt, and black pepper. Add a few slices of pineapple. Blend until smooth, adding a little reserved chili soaking liquid if needed to achieve a thick paste.',
      'In a large bowl, toss the thinly sliced pork shoulder with the marinade, ensuring each slice is well-coated. Cover and refrigerate for at least 4 hours, or preferably overnight (up to 24 hours).',
      'If cooking without a vertical spit: Preheat oven to 180°C (350°F). Layer the marinated pork slices tightly in a loaf pan or on a skewer horizontally in a baking dish. Alternatively, cook in a hot skillet in batches.',
      'If using a vertical spit (trompo): Stack the marinated pork slices tightly onto the spit, alternating with thin pineapple slices occasionally. Place a large pineapple chunk on top.',
      'Cook the pork until done and slightly charred on the edges. For oven/skillet method, this may take 30-45 minutes; turn or stir occasionally. For vertical spit, shave off cooked outer layers as it rotates.',
      'Warm corn tortillas on a hot comal or skillet.',
      'Thinly slice or shave the cooked pork. Serve immediately on warm tortillas, topped with diced fresh pineapple, finely diced white onion, and chopped fresh cilantro. Offer lime wedges and your favorite salsa on the side.'
    ],
    prepTime: '45 mins + marination',
    cookTime: '45-90 mins (varies by method)',
    servings: '6-8',
    notes: 'The key is thin pork slices and a flavorful marinade. If you don\'t have a vertical spit, grilling or pan-searing in batches works well for char.'
  },
  {
    id: '5',
    name: 'Beef Rendang',
    region: 'Minangkabau (Sumatra)',
    country: 'Indonesia',
    image: 'https://placehold.co/800x600.png',
    description: 'A rich and tender coconut beef stew, slow-cooked for hours until the liquid evaporates and the meat becomes dark and caramelized.',
    ingredients: [
      { name: 'Beef Chuck', quantity: '1', unit: 'kg', image: 'https://placehold.co/150x150.png', notes: 'Cut into 2-inch cubes' },
      { name: 'Coconut Milk', quantity: '800', unit: 'ml', image: 'https://placehold.co/150x150.png', notes: 'Full fat, from 2 cans' },
      { name: 'Lemongrass', quantity: '3', unit: 'stalks', image: 'https://placehold.co/150x150.png', notes: 'White and light green parts, bruised' },
      { name: 'Galangal', quantity: '2', unit: 'inch piece', image: 'https://placehold.co/150x150.png', notes: 'Fresh, sliced or bruised' },
      { name: 'Turmeric Leaves', quantity: '2', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Optional, tied in a knot' },
      { name: 'Kaffir Lime Leaves', quantity: '5-6', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Fresh or dried' },
      { name: 'Red Chilies', quantity: '8-12', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Long red, or bird\'s eye to taste, deseeded if preferred milder' },
      { name: 'Shallots', quantity: '200', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Peeled (about 10-12)' },
      { name: 'Garlic', quantity: '6', unit: 'cloves', image: 'https://placehold.co/150x150.png', notes: 'Peeled' },
      { name: 'Ginger', quantity: '1.5', unit: 'inch piece', image: 'https://placehold.co/150x150.png', notes: 'Fresh, peeled' },
      { name: 'Coriander Powder', quantity: '1.5', unit: 'tbsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Turmeric Powder', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Salt', quantity: '1.5', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Or to taste' },
      { name: 'Toasted Coconut Flakes (Kerisik)', quantity: '4', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Pounded if coarse' },
      { name: 'Palm Sugar (Gula Melaka)', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Grated, or brown sugar' },
    ],
    instructions: [
      'Prepare the spice paste (bumbu): In a food processor or blender, combine red chilies, shallots, garlic, ginger, coriander powder, and turmeric powder. Blend until smooth, adding a little water if necessary to help the blending process.',
      'In a large heavy-bottomed pot or Dutch oven, combine the beef cubes, spice paste, coconut milk, bruised lemongrass stalks, sliced galangal, turmeric leaves (if using), and kaffir lime leaves. Stir well to combine.',
      'Bring the mixture to a boil over medium-high heat, then reduce the heat to low. Add salt and palm sugar. Stir well.',
      'Simmer uncovered for 2.5 to 3.5 hours, or even longer, stirring occasionally (more frequently towards the end as the liquid reduces) to prevent the bottom from scorching. The goal is for the liquid to evaporate almost completely and for the beef to become incredibly tender.',
      'Once the sauce has significantly thickened and the oil starts to separate from the coconut milk (this is a good sign), add the toasted coconut flakes (kerisik). Continue to cook, stirring frequently, for another 20-30 minutes, or until the rendang is dark brown, very fragrant, and the sauce is clinging to the beef pieces rather than being wet.',
      'Taste and adjust seasoning if necessary. The final rendang should be rich, spicy, slightly sweet, and savory, with very tender beef.',
      'Remove lemongrass, galangal, and leaves before serving if desired. Serve hot with steamed rice and sambal.'
    ],
    prepTime: '40 mins',
    cookTime: '3-4 hours',
    servings: '6-8',
    notes: 'Patience is key for rendang. The long, slow cooking process is what develops its unique flavor and texture. It tastes even better the next day.'
  },
  {
    id: '6',
    name: 'Pad Thai',
    region: 'Central Thailand',
    country: 'Thailand',
    image: 'https://placehold.co/800x600.png',
    description: 'Thailand\'s national stir-fried noodle dish: a harmonious blend of sweet, sour, salty, and spicy flavors with rice noodles, shrimp or tofu, eggs, and peanuts.',
    ingredients: [
      { name: 'Rice Noodles', quantity: '200', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Flat, medium width (about 1/4 inch)' },
      { name: 'Shrimp', quantity: '150', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Large, peeled and deveined (or Tofu)' },
      { name: 'Tofu', quantity: '150', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Firm or extra-firm, pressed and cubed (alternative or addition to shrimp)' },
      { name: 'Eggs', quantity: '2', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Large, lightly beaten' },
      { name: 'Garlic Chives', quantity: '1/2', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'Cut into 2-inch lengths (or scallions)' },
      { name: 'Bean Sprouts', quantity: '1.5', unit: 'cups', image: 'https://placehold.co/150x150.png', notes: 'Fresh, divided' },
      { name: 'Roasted Peanuts', quantity: '1/3', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'Unsalted, roughly chopped, for garnish' },
      { name: 'Tamarind Paste', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Seedless concentrate' },
      { name: 'Fish Sauce', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Good quality' },
      { name: 'Palm Sugar', quantity: '2-3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Grated or finely chopped (or brown sugar)' },
      { name: 'Soy Sauce', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Light soy sauce' },
      { name: 'Chili Flakes', quantity: '1/2-1', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Or to taste, for garnish' },
      { name: 'Lime Wedges', quantity: '4', unit: '', image: 'https://placehold.co/150x150.png', notes: 'For serving' },
      { name: 'Garlic', quantity: '3', unit: 'cloves', image: 'https://placehold.co/150x150.png', notes: 'Minced' },
      { name: 'Shallots', quantity: '1', unit: 'small', image: 'https://placehold.co/150x150.png', notes: 'Minced (optional)' },
      { name: 'Olive Oil', quantity: '3', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'Or other neutral cooking oil' },
    ],
    instructions: [
      'Soak rice noodles in warm (not hot) water for 20-30 minutes, or until pliable but still slightly firm. Drain well and set aside. Do not oversoak, or they will become mushy when stir-fried.',
      'Prepare the Pad Thai sauce: In a small bowl, whisk together tamarind paste, fish sauce, palm sugar, and soy sauce until the sugar is dissolved. Taste and adjust sweetness, sourness, or saltiness as needed. Set aside.',
      'Heat 1 tablespoon of oil in a large wok or heavy-bottomed skillet over medium-high heat. Add shrimp (and/or tofu) and cook until shrimp are pink and opaque, or tofu is golden brown. Remove from wok and set aside.',
      'Add remaining 2 tablespoons of oil to the wok. Add minced garlic and shallots (if using). Stir-fry for about 30 seconds until fragrant.',
      'Push garlic and shallots to one side of the wok. Pour in the lightly beaten eggs. Let them set slightly, then scramble until just cooked. Mix with the garlic and shallots.',
      'Add the drained noodles and the prepared Pad Thai sauce to the wok. Stir-fry quickly and continuously for 2-3 minutes, using tongs or chopsticks to toss and coat the noodles evenly with the sauce. Ensure the noodles are separated.',
      'Add the cooked shrimp/tofu, half of the bean sprouts, and the garlic chives to the wok. Continue to stir-fry for another 1-2 minutes until everything is heated through and the noodles are tender but still have a slight chew.',
      'Serve immediately on individual plates. Garnish generously with the remaining fresh bean sprouts, chopped roasted peanuts, chili flakes (if using), and a lime wedge on the side for squeezing over.'
    ],
    prepTime: '30 mins (includes noodle soaking)',
    cookTime: '10-12 mins',
    servings: '2-3',
    notes: 'High heat and quick cooking are essential for good Pad Thai. Have all your ingredients prepped and ready by the stove (mise en place).'
  },
  {
    id: '7',
    name: 'Moussaka',
    region: 'Balkans/Eastern Mediterranean',
    country: 'Greece',
    image: 'https://placehold.co/800x600.png',
    description: 'A rich, layered oven-bake dish primarily featuring eggplant and/or potatoes, a spiced minced meat sauce, and a creamy béchamel topping.',
    ingredients: [
      { name: 'Eggplants', quantity: '2-3', unit: 'large', image: 'https://placehold.co/150x150.png', notes: 'About 1kg, sliced 1/2 inch thick' },
      { name: 'Potatoes', quantity: '2-3', unit: 'medium', image: 'https://placehold.co/150x150.png', notes: 'Optional, peeled and sliced 1/4 inch thick' },
      { name: 'Minced Lamb or Beef', quantity: '500', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Lamb is traditional for Greek Moussaka' },
      { name: 'Onion', quantity: '1', unit: 'large', image: 'https://placehold.co/150x150.png', notes: 'Finely chopped' },
      { name: 'Garlic', quantity: '3-4', unit: 'cloves', image: 'https://placehold.co/150x150.png', notes: 'Minced' },
      { name: 'Chopped Tomatoes', quantity: '400', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Canned, good quality' },
      { name: 'Red Wine', quantity: '1/2', unit: 'cup', image: 'https://placehold.co/150x150.png', notes: 'Dry red wine (optional, but adds depth)' },
      { name: 'Tomato Puree', quantity: '1', unit: 'tbsp', image: 'https://placehold.co/150x150.png' },
      { name: 'Cinnamon', quantity: '1/2-1', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Ground' },
      { name: 'Oregano', quantity: '1', unit: 'tsp', image: 'https://placehold.co/150x150.png', notes: 'Dried' },
      { name: 'Bay Leaf', quantity: '1', unit: '', image: 'https://placehold.co/150x150.png' },
      { name: 'Butter', quantity: '100', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'For béchamel' },
      { name: 'Flour', quantity: '100', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'All-purpose, for béchamel' },
      { name: 'Milk', quantity: '1', unit: 'litre', image: 'https://placehold.co/150x150.png', notes: 'Whole milk, warm, for béchamel' },
      { name: 'Egg Yolks', quantity: '2-3', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Large, for béchamel' },
      { name: 'Parmesan Cheese', quantity: '75', unit: 'g', image: 'https://placehold.co/150x150.png', notes: 'Freshly grated (or Kefalotyri if available)' },
      { name: 'Nutmeg', quantity: 'pinch', unit: '', image: 'https://placehold.co/150x150.png', notes: 'Freshly grated, for béchamel' },
      { name: 'Olive Oil', quantity: '4-5', unit: 'tbsp', image: 'https://placehold.co/150x150.png', notes: 'For frying vegetables' },
      { name: 'Salt', quantity: 'to taste', unit: '', image: 'https://placehold.co/150x150.png' },
      { name: 'Black Pepper', quantity: 'to taste', unit: '', image: 'https://placehold.co/150x150.png' },
    ],
    instructions: [
      'Prepare vegetables: Sprinkle eggplant slices with salt and let them sit in a colander for 30-60 minutes to draw out bitterness and excess moisture. Rinse and pat thoroughly dry with paper towels. If using potatoes, you can lightly fry or bake them until just tender.',
      'In a large skillet or frying pan, heat olive oil over medium-high heat. Fry eggplant slices in batches until golden brown on both sides. Drain on paper towels. Do the same for potato slices if not already pre-cooked.',
      'Prepare meat sauce: In a large pot or Dutch oven, heat 1 tbsp olive oil. Add chopped onion and cook until softened. Add minced garlic and cook for another minute until fragrant. Add minced lamb or beef and cook, breaking it up with a spoon, until browned. Drain off any excess fat.',
      'Stir in tomato puree, chopped tomatoes, red wine (if using), cinnamon, oregano, bay leaf, salt, and pepper. Bring to a simmer, then reduce heat and cook, partially covered, for 30-45 minutes, or until the sauce has thickened. Remove bay leaf.',
      'Prepare béchamel sauce: In a medium saucepan, melt butter over medium heat. Whisk in flour and cook for 1-2 minutes, stirring constantly, to form a roux. Gradually whisk in warm milk, ensuring no lumps form. Continue whisking and bring to a gentle simmer. Cook, stirring frequently, until the sauce thickens enough to coat the back of a spoon (about 5-10 minutes).',
      'Remove béchamel from heat. Let it cool slightly, then whisk in egg yolks one at a time. Stir in about 2/3 of the grated Parmesan cheese and a pinch of freshly grated nutmeg. Season with salt and pepper to taste.',
      'Assemble Moussaka: Preheat oven to 180°C (350°F). Lightly grease a 9x13 inch baking dish. Arrange a layer of potato slices (if using) on the bottom, followed by a layer of half the fried eggplant slices. Top with the meat sauce, spreading it evenly. Add another layer with the remaining eggplant slices.',
      'Pour the béchamel sauce evenly over the top layer of eggplant. Sprinkle with the remaining Parmesan cheese.',
      'Bake for 45-60 minutes, or until the top is golden brown and bubbling, and the moussaka is heated through. Let it rest for at least 20-30 minutes before slicing and serving. This helps it set and makes it easier to cut clean portions.'
    ],
    prepTime: '1 hour 15 mins (includes vegetable prep)',
    cookTime: '1.5 - 2 hours (includes meat sauce and baking)',
    servings: '6-8',
    notes: 'Letting the moussaka rest after baking is crucial for it to hold its shape when sliced. It\'s often even better the next day!'
  }
];

export const commonIngredients = Array.from(new Set(mockRecipes.flatMap(recipe => recipe.ingredients.map(ing => ing.name)))).sort();
export const commonRegions = Array.from(new Set(mockRecipes.map(recipe => recipe.region))).sort();
export const commonCountries = Array.from(new Set(mockRecipes.map(recipe => recipe.country))).sort();
