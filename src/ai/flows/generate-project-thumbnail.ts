// A Genkit flow for generating project thumbnails using AI, incorporating a reference image if provided to enhance the thumbnail creation process.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectThumbnailInputSchema = z.object({
  description: z.string().describe('The description of the project.'),
  referenceImageDataUri: z
    .string()
    .optional()
    .describe(
      'Optional: A reference image for the thumbnail, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'       
    ),
});

export type GenerateProjectThumbnailInput = z.infer<
  typeof GenerateProjectThumbnailInputSchema
>;

const GenerateProjectThumbnailOutputSchema = z.object({
  thumbnailDataUri: z
    .string()
    .describe(
      'The generated thumbnail as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});

export type GenerateProjectThumbnailOutput = z.infer<
  typeof GenerateProjectThumbnailOutputSchema
>;

export async function generateProjectThumbnail(
  input: GenerateProjectThumbnailInput
): Promise<GenerateProjectThumbnailOutput> {
  return generateProjectThumbnailFlow(input);
}

const generateProjectThumbnailPrompt = ai.definePrompt({
  name: 'generateProjectThumbnailPrompt',
  input: {schema: GenerateProjectThumbnailInputSchema},
  output: {schema: GenerateProjectThumbnailOutputSchema},
  prompt: `You are an AI that generates thumbnails for project pages.

  The user will provide a description of the project. If they provide a reference image, incorporate elements of that image into the thumbnail. Optimize the thumbnail for visual appeal and relevance to the project description.

  Description: {{{description}}}
  {{#if referenceImageDataUri}}
  Reference Image: {{media url=referenceImageDataUri}}
  {{/if}}`,
});

const generateProjectThumbnailFlow = ai.defineFlow(
  {
    name: 'generateProjectThumbnailFlow',
    inputSchema: GenerateProjectThumbnailInputSchema,
    outputSchema: GenerateProjectThumbnailOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.referenceImageDataUri ? [
        {media: {url: input.referenceImageDataUri}},
        {text: generateProjectThumbnailPrompt},
      ] : generateProjectThumbnailPrompt,
      // The prompt template automatically includes the description and image URL if present.
      // The model is configured to use the description and reference image if available to generate the thumbnail.
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate thumbnail.');
    }
    return {thumbnailDataUri: media.url};
  }
);
