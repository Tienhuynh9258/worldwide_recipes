import { config } from 'dotenv';
config();

import '@/ai/flows/voice-search-recipe.ts'; // This now exports voiceQueryToRecipeNames
import '@/ai/flows/image-search-recipe.ts';
