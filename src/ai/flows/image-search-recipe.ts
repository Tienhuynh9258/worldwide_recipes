// 'use server'
'use server';
/**
 * @fileOverview Flow for searching recipes based on an uploaded image.
 *
 * - imageSearchRecipe - Searches for recipes related to an image of a dish or ingredient.
 * - ImageSearchRecipeInput - The input type for the imageSearchRecipe function.
 * - ImageSearchRecipeOutput - The return type for the imageSearchRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageSearchRecipeInputSchema = z.object({
  image: z
    .string()
    .describe(
      "A photo of a dish or ingredient, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageSearchRecipeInput = z.infer<typeof ImageSearchRecipeInputSchema>;

const ImageSearchRecipeOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('A list of recipe names related to the image.'),
});
export type ImageSearchRecipeOutput = z.infer<typeof ImageSearchRecipeOutputSchema>;

export async function imageSearchRecipe(input: ImageSearchRecipeInput): Promise<ImageSearchRecipeOutput> {
  return imageSearchRecipeFlow(input);
}

const imageSearchRecipePrompt = ai.definePrompt({
  name: 'imageSearchRecipePrompt',
  input: {schema: ImageSearchRecipeInputSchema},
  output: {schema: ImageSearchRecipeOutputSchema},
  prompt: `You are a recipe finding assistant.  A user will provide an image of a dish or an ingredient.

  You will respond with an array of recipes that might contain the dish or ingredient.

  Do not include any explanation, only return the array of recipes.

  Here is the image: {{media url=image}}`,
});

const imageSearchRecipeFlow = ai.defineFlow(
  {
    name: 'imageSearchRecipeFlow',
    inputSchema: ImageSearchRecipeInputSchema,
    outputSchema: ImageSearchRecipeOutputSchema,
  },
  async input => {
    const {output} = await imageSearchRecipePrompt(input);
    return output!;
  }
);
