import { getProjects } from '@/lib/db';
import ProjectsGrid from '@/components/projects-grid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-[225px] w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ColorGradingPage() {
  const projects = await getProjects();
  const colorGradingProjects = projects.filter(p => p.category === 'Color Grading');

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProjectsGridSkeleton />}>
        <ProjectsGrid projects={colorGradingProjects} />
      </Suspense>
    </div>
  );
}
