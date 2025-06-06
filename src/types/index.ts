export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  image: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  region: string;
  country: string;
  image: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[]; // Changed to string array for step-by-step
  notes?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: string;
}

export interface AiGeneratedRecipe {
  recipeName: string;
  ingredients: string[]; // Raw string from AI, might need parsing or reformatting
  instructions: string; // Raw string from AI
}
