'use server';

/**
 * @fileOverview Voice search recipe flow.
 *
 * - voiceSearchRecipe - A function that handles the voice search recipe process.
 * - VoiceSearchRecipeInput - The input type for the voiceSearchRecipe function.
 * - VoiceSearchRecipeOutput - The return type for the voiceSearchRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceSearchRecipeInputSchema = z.object({
  voiceQueryDataUri: z
    .string()
    .describe(
      "The user's voice query as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceSearchRecipeInput = z.infer<typeof VoiceSearchRecipeInputSchema>;

const VoiceSearchRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.array(z.string()).describe('List of ingredients for the recipe.'),
  instructions: z.string().describe('The preparation instructions for the recipe.'),
});
export type VoiceSearchRecipeOutput = z.infer<typeof VoiceSearchRecipeOutputSchema>;

export async function voiceSearchRecipe(input: VoiceSearchRecipeInput): Promise<VoiceSearchRecipeOutput> {
  return voiceSearchRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceSearchRecipePrompt',
  input: {schema: VoiceSearchRecipeInputSchema},
  output: {schema: VoiceSearchRecipeOutputSchema},
  prompt: `You are a helpful assistant that helps users find recipes based on their voice query.

  Based on the user's voice query, extract the recipe name, ingredients, and preparation instructions.

  Voice Query: {{media url=voiceQueryDataUri}}
  `,
});

const voiceSearchRecipeFlow = ai.defineFlow(
  {
    name: 'voiceSearchRecipeFlow',
    inputSchema: VoiceSearchRecipeInputSchema,
    outputSchema: VoiceSearchRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
