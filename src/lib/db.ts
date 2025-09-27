'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Project, PhotographyImage } from './definitions';

// Define paths to data files
const dataDir = path.join(process.cwd(), 'src', 'data');
const projectsFilePath = path.join(dataDir, 'projects.json');
const photographyFilePath = path.join(dataDir, 'photography.json');

// --- Generic Data Access Functions ---

async function readData<T>(filePath: string, defaultData: T[] = []): Promise<T[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    if (fileContent.trim() === '') {
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    return JSON.parse(fileContent);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    console.error(`Error reading data from ${filePath}:`, error);
    throw new Error(`Could not read data from ${filePath}.`);
  }
}

async function writeData<T>(filePath: string, data: T[]): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing data to ${filePath}:`, error);
    throw new Error(`Could not write data to ${filePath}.`);
  }
}

// --- Project-Specific Functions ---

export async function getProjects(): Promise<Project[]> {
  const projects = await readData<Project>(projectsFilePath);
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function saveProject(project: Project): Promise<void> {
  const projects = await getProjects();
  const existingIndex = projects.findIndex((p) => p.id === project.id);

  if (existingIndex > -1) {
    projects[existingIndex] = project;
  } else {
    projects.unshift(project);
  }
  await writeData(projectsFilePath, projects);
}

export async function deleteProjectById(id: string): Promise<void> {
  let projects = await getProjects();
  projects = projects.filter((p) => p.id !== id);
  await writeData(projectsFilePath, projects);
}


// --- Photography-Specific Functions ---

export async function getPhotographyImages(): Promise<PhotographyImage[]> {
  const images = await readData<PhotographyImage>(photographyFilePath);
  return images.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPhotographyImageById(id: string): Promise<PhotographyImage | undefined> {
  const images = await getPhotographyImages();
  return images.find(img => img.id === id);
}

export async function savePhotographyImage(image: PhotographyImage): Promise<void> {
  const images = await getPhotographyImages();
  images.unshift(image);
  await writeData(photographyFilePath, images);
}

export async function deletePhotographyImageById(id: string): Promise<void> {
  let images = await getPhotographyImages();
  images = images.filter((img) => img.id !== id);
  await writeData(photographyFilePath, images);
}
