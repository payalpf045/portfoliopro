'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import {
  saveProject as dbSaveProject,
  deleteProjectById,
  getProjectById,
  savePhotographyImage as dbSavePhotographyImage,
  deletePhotographyImageById,
  getPhotographyImageById,
} from './db';
import type { Project, PhotographyImage } from './definitions';
import { generateProjectThumbnail } from '@/ai/flows/generate-project-thumbnail';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// --- File Handling Utility ---
async function saveFile(file: File, uploadDir: string = 'uploads'): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const fileExtension = path.extname(file.name);
  const fileName = `${crypto.randomBytes(8).toString('hex')}${fileExtension}`;
  const publicDir = path.join(process.cwd(), 'public', uploadDir);
  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(path.join(publicDir, fileName), Buffer.from(fileBuffer));
  return `/${uploadDir}/${fileName}`;
}

// --- Schemas ---
const baseProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  date: z.string().min(1, 'Date is required'),
  thumbnail: z.string().optional(),
  category: z.enum(['Film', 'Color Grading']),
});

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );

const filmSchema = baseProjectSchema.extend({
  category: z.literal('Film'),
  youtubeVideoId: z.string().min(1, 'YouTube Video ID is required.'),
  stills: z.array(z.string()).optional(),
});

const colorGradingSchema = baseProjectSchema.extend({
  category: z.literal('Color Grading'),
  beforeImageUrl: z.string().optional(),
  afterImageUrl: z.string().optional(),
});

// --- Project Actions ---

export async function saveProject(prevState: any, formData: FormData) {
  const category = formData.get('category') as Project['category'];
  
  if (category === 'Film') {
    return saveFilmProject(formData);
  } else if (category === 'Color Grading') {
    return saveColorGradingProject(formData);
  }
  
  return { message: 'Invalid project category.', success: false };
}

async function saveFilmProject(formData: FormData) {
  const validatedFields = filmSchema.safeParse({
    id: formData.get('id') || undefined,
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('date'),
    category: 'Film',
    youtubeVideoId: formData.get('youtubeVideoId'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed: ' + validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { id, ...data } = validatedFields.data;
  const projectId = id || crypto.randomBytes(8).toString('hex');

  try {
    const existingProject = id ? await getProjectById(id) : undefined;
    let newThumbnailUrl = existingProject?.thumbnail || formData.get('thumbnail') as string || '';
    
    const thumbnailFile = formData.get('thumbnailFile') as File;
    if (thumbnailFile && thumbnailFile.size > 0) {
      const thumbValidation = fileSchema.safeParse(thumbnailFile);
      if (!thumbValidation.success) throw new Error('Thumbnail validation failed');
      if (existingProject?.thumbnail && !existingProject.thumbnail.startsWith('data:')) {
        await fs.unlink(path.join(process.cwd(), 'public', existingProject.thumbnail)).catch(() => {});
      }
      newThumbnailUrl = await saveFile(thumbnailFile);
    }
    
    const stillFiles = formData.getAll('stills') as File[];
    let newStillsUrls = existingProject?.stills || [];
    if (stillFiles.some(f => f.size > 0)) {
        newStillsUrls = await Promise.all(stillFiles.map(file => saveFile(file)));
    }

    const projectData: Project = {
      ...data,
      id: projectId,
      thumbnail: newThumbnailUrl,
      stills: newStillsUrls,
    };
    
    await dbSaveProject(projectData);
  } catch (e: any) {
    return { message: 'Failed to save project: ' + e.message, success: false };
  }
  revalidatePath('/admin');
  revalidatePath(`/project/${projectId}`);
  redirect('/admin');
}

async function saveColorGradingProject(formData: FormData) {
    const validatedFields = colorGradingSchema.safeParse({
        id: formData.get('id') || undefined,
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        category: 'Color Grading',
    });

    if (!validatedFields.success) {
        return {
          message: 'Validation failed: ' + validatedFields.error.flatten().fieldErrors,
          success: false,
        };
    }

    const { id, ...data } = validatedFields.data;
    const projectId = id || crypto.randomBytes(8).toString('hex');

    try {
        const existingProject = id ? await getProjectById(id) : undefined;
        let beforeUrl = existingProject?.beforeImageUrl;
        let afterUrl = existingProject?.afterImageUrl;

        const beforeFile = formData.get('beforeImage') as File;
        if (beforeFile && beforeFile.size > 0) {
            if (beforeUrl) await fs.unlink(path.join(process.cwd(), 'public', beforeUrl)).catch(() => {});
            beforeUrl = await saveFile(beforeFile);
        }

        const afterFile = formData.get('afterImage') as File;
        if (afterFile && afterFile.size > 0) {
            if (afterUrl) await fs.unlink(path.join(process.cwd(), 'public', afterUrl)).catch(() => {});
            afterUrl = await saveFile(afterFile);
        }

        if (!beforeUrl || !afterUrl) {
            throw new Error('Before and After images are required for new projects.');
        }

        const projectData: Project = {
            ...data,
            id: projectId,
            beforeImageUrl: beforeUrl,
            afterImageUrl: afterUrl,
            thumbnail: afterUrl, // Use after image as thumbnail
        };

        await dbSaveProject(projectData);
    } catch (e: any) {
        return { message: 'Failed to save project: ' + e.message, success: false };
    }
    revalidatePath('/admin');
    revalidatePath(`/project/${projectId}`);
    redirect('/admin');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  try {
    const project = await getProjectById(id);
    if(project) {
        // Delete associated files
        const filesToDelete: string[] = [];
        if (project.thumbnail && !project.thumbnail.startsWith('data:')) filesToDelete.push(project.thumbnail);
        if (project.beforeImageUrl) filesToDelete.push(project.beforeImageUrl);
        if (project.afterImageUrl) filesToDelete.push(project.afterImageUrl);
        if (project.stills) filesToDelete.push(...project.stills);

        for (const fileUrl of filesToDelete) {
            await fs.unlink(path.join(process.cwd(), 'public', fileUrl)).catch(() => {});
        }
    }
    await deleteProjectById(id);
  } catch (e) {
    // handle error
  }
  revalidatePath('/admin');
  revalidatePath('/');
}

// --- Photography Actions ---
export async function savePhotographyImage(prevState: any, formData: FormData) {
    const imageFile = formData.get('image') as File;
    const title = formData.get('title') as string;

    if (!imageFile || imageFile.size === 0) return { message: 'Image is required.' };
    if (!title) return { message: 'Title is required.' };
    
    const imageId = crypto.randomBytes(8).toString('hex');
    try {
        const imageUrl = await saveFile(imageFile, 'photography');
        const imageData: PhotographyImage = {
            id: imageId,
            url: imageUrl,
            title: title,
            date: new Date().toISOString(),
        };
        await dbSavePhotographyImage(imageData);
    } catch (e: any) {
        return { message: 'Failed to save image: ' + e.message };
    }

    revalidatePath('/admin/photography');
    revalidatePath('/photography');
    return { message: 'Image uploaded successfully.' };
}


export async function deletePhotographyImage(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  try {
    const image = await getPhotographyImageById(id);
    if (image && image.url) {
      await fs.unlink(path.join(process.cwd(), 'public', image.url)).catch(() => {});
    }
    await deletePhotographyImageById(id);
  } catch (e) {
    // handle error
  }
  revalidatePath('/admin/photography');
  revalidatePath('/photography');
}

// --- AI Thumbnail Action ---
export async function generateThumbnailAction(description: string, referenceImageDataUri?: string) {
    if (!description) {
        return { error: 'Description is required to generate a thumbnail.' };
    }
    try {
        const result = await generateProjectThumbnail({
            description,
            referenceImageDataUri,
        });
        return { thumbnailDataUri: result.thumbnailDataUri };
    } catch (error) {
        console.error('AI thumbnail generation failed:', error);
        return { error: 'Failed to generate AI thumbnail.' };
    }
}
