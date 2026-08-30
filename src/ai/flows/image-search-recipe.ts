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
import {mockRecipes} from '@/lib/mock-data';
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

const imageSearchPromptInputSchema = ImageSearchRecipeInputSchema.extend({
  availableRecipes: z.array(z.string()),
});

const imageSearchRecipePrompt = ai.definePrompt({
  name: 'imageSearchRecipePrompt',
  input: {schema: imageSearchPromptInputSchema},
  output: {schema: ImageSearchRecipeOutputSchema},
  prompt: `You are a recipe finding assistant for a recipe app. The app only has these recipes available:
  {{#each availableRecipes}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}

  A user will provide an image of a dish or an ingredient. Identify the dish or ingredient, then return only the
  recipe names from the list above that are the same dish or a very close match. Copy matching names exactly as
  written in the list, do not invent new names or variations. If none of the recipes in the list match, respond
  with an empty array.

  Do not include any explanation, only return the array of matching recipe names.

  Here is the image: {{media url=image}}`,
});

const imageSearchRecipeFlow = ai.defineFlow(
  {
    name: 'imageSearchRecipeFlow',
    inputSchema: ImageSearchRecipeInputSchema,
    outputSchema: ImageSearchRecipeOutputSchema,
  },
  async input => {
    const availableRecipes = mockRecipes.map(recipe => recipe.name);
    const {output} = await imageSearchRecipePrompt({
      image: input.image,
      availableRecipes,
    });

    const canonicalByLowerCase = new Map(availableRecipes.map(name => [name.toLowerCase(), name]));
    const matchedRecipes = Array.from(
      new Set(
        (output?.recipes ?? [])
          .map(name => canonicalByLowerCase.get(name.trim().toLowerCase()))
          .filter((name): name is string => Boolean(name))
      )
    );

    return {recipes: matchedRecipes};
  }
);
