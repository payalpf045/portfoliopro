# **App Name**: Payal Portfolio

## Core Features:

- Public Portfolio: Display projects and photography in an engaging and responsive manner. Separate sections for Film, Color Grading, and Photography.
- Admin Panel: Password-protected admin area for managing all content: projects, filmography, and photography. Uses client-side session storage.
- Project Management: Create, edit, and delete film and color grading projects with dedicated server actions and Zod validation.
- Photography Management: Upload new photography images and delete existing ones via server actions. Utilizes a file-based database for storage.
- AI Thumbnail Generation: Generate project thumbnails using project description and optional reference images, powered by Genkit and the Gemini model. The LLM uses a tool to reason when or if a provided reference image might add something of value to the output. Outputs a data URI.
- Real-time Updates: Implement server actions that leverage revalidatePath from next/navigation upon execution, ensuring all data mutations reflect in the admin panel and on public-facing pages in real-time without errors or issues.
- Project Category Rendering: Dynamically render specific project details on the project page based on the project category, displaying YouTube players for 'Film' and before-after sliders for 'Color Grading'.

## Style Guidelines:

- Background: Dark charcoal (#0A0A0A) to give focus to the work.
- Primary: Light grey (#F0F0F0) for clear contrast on dark background.
- Accent: Soft lavender (#D8C1FF) for highlights and interactive elements.
- Headline font: 'Baskervville', a serif font lending elegance to titles.
- Body font: 'Inter', a sans-serif font for clear, readable text.
- lucide-react icons used for actions, navigation, and social media.
- Masonry layout for photography, grid layout for project cards.
- Subtle hover effects on project cards (lift and shadow).