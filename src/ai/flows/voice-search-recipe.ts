'use server';

/**
 * @fileOverview Voice query to recipe names flow.
 *
 * - voiceQueryToRecipeNames - A function that handles converting a voice query to a list of recipe names.
 * - VoiceQueryToRecipeNamesInput - The input type for the voiceQueryToRecipeNames function.
 * - VoiceQueryToRecipeNamesOutput - The return type for the voiceQueryToRecipeNames function.
 */

import {ai} from '@/ai/genkit';
import {mockRecipes} from '@/lib/mock-data';
import {z} from 'genkit';

const VoiceQueryToRecipeNamesInputSchema = z.object({
  voiceQueryDataUri: z
    .string()
    .describe(
      "The user's voice query as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceQueryToRecipeNamesInput = z.infer<typeof VoiceQueryToRecipeNamesInputSchema>;

const VoiceQueryToRecipeNamesOutputSchema = z.object({
  recipes: z.array(z.string()).describe('A list of recipe names related to the voice query.'),
});
export type VoiceQueryToRecipeNamesOutput = z.infer<typeof VoiceQueryToRecipeNamesOutputSchema>;

export async function voiceQueryToRecipeNames(input: VoiceQueryToRecipeNamesInput): Promise<VoiceQueryToRecipeNamesOutput> {
  return voiceQueryToRecipeNamesFlow(input);
}

const promptInputSchema = VoiceQueryToRecipeNamesInputSchema.extend({
  availableRecipes: z.array(z.string()),
});

const prompt = ai.definePrompt({
  name: 'voiceQueryToRecipeNamesPrompt',
  input: {schema: promptInputSchema},
  output: {schema: VoiceQueryToRecipeNamesOutputSchema},
  prompt: `You are a recipe finding assistant for a recipe app. The app only has these recipes available:
  {{#each availableRecipes}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}

  A user will provide a voice query. Interpret the voice query as a search term for recipes, then return only the
  recipe names from the list above that match or are closely related to the query. Copy matching names exactly as
  written in the list, do not invent new names or variations. If none of the recipes in the list match, respond
  with an empty array.

  Do not include any explanation, only return the array of matching recipe names.

  Voice Query: {{media url=voiceQueryDataUri}}
  `,
});

const voiceQueryToRecipeNamesFlow = ai.defineFlow(
  {
    name: 'voiceQueryToRecipeNamesFlow',
    inputSchema: VoiceQueryToRecipeNamesInputSchema,
    outputSchema: VoiceQueryToRecipeNamesOutputSchema,
  },
  async input => {
    const availableRecipes = mockRecipes.map(recipe => recipe.name);
    const {output} = await prompt({
      voiceQueryDataUri: input.voiceQueryDataUri,
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
