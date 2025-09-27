import { getProjects } from '@/lib/db';
import ProjectsGrid from '@/components/projects-grid';
import { Suspense } from 'react';

export default async function FilmPage() {
  const projects = await getProjects();
  const filmProjects = projects.filter(p => p.category === 'Film');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline font-semibold mb-8">Film</h1>
      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsGrid projects={filmProjects} />
      </Suspense>
    </div>
  );
}
