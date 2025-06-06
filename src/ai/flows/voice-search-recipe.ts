'use server';

/**
 * @fileOverview Voice query to recipe names flow.
 *
 * - voiceQueryToRecipeNames - A function that handles converting a voice query to a list of recipe names.
 * - VoiceQueryToRecipeNamesInput - The input type for the voiceQueryToRecipeNames function.
 * - VoiceQueryToRecipeNamesOutput - The return type for the voiceQueryToRecipeNames function.
 */

import {ai} from '@/ai/genkit';
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

const prompt = ai.definePrompt({
  name: 'voiceQueryToRecipeNamesPrompt',
  input: {schema: VoiceQueryToRecipeNamesInputSchema},
  output: {schema: VoiceQueryToRecipeNamesOutputSchema},
  prompt: `You are a recipe finding assistant. A user will provide a voice query.
  Interpret the voice query as a search term for recipes.
  Respond with an array of recipe names that match or are related to the voice query.
  Do not include any explanation, only return the array of recipe names.

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
    const {output} = await prompt(input);
    return output!;
  }
);
