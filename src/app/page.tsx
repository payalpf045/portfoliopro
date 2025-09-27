import { getProjects } from '@/lib/db';
import ProjectsGrid from '@/components/projects-grid';
import { Suspense } from 'react';

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl md:text-7xl font-headline text-center my-12">Visual Storytelling</h1>
      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsGrid projects={projects} />
      </Suspense>
    </div>
  );
}
