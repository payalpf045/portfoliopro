import { getProjects } from '@/lib/db';
import ProjectsGrid from '@/components/projects-grid';
import { Suspense } from 'react';

export default async function ColorGradingPage() {
  const projects = await getProjects();
  const colorGradingProjects = projects.filter(p => p.category === 'Color Grading');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline font-semibold mb-8">Color Grading</h1>
      <Suspense fallback={<p>Loading projects...</p>}>
        <ProjectsGrid projects={colorGradingProjects} />
      </Suspense>
    </div>
  );
}
