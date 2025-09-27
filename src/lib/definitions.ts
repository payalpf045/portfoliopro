export type ProjectCategory = 'Film' | 'Color Grading';

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  thumbnail: string; // URL to image
  date: string; // ISO 8601 date string
  
  // Film specific
  youtubeVideoId?: string;
  stills?: string[]; // Array of URLs to images

  // Color Grading specific
  beforeImageUrl?: string;
  afterImageUrl?: string;
};

export type PhotographyImage = {
  id: string;
  url: string;
  title: string;
  date: string;
};
