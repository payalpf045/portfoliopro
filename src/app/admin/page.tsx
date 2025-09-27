import { Suspense } from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/db';
import ProjectsTable from '@/components/admin/projects-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ProjectsTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-16 rounded-md" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-semibold">Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ProjectsTableSkeleton />}>
        <ProjectsTable projects={projects} />
      </Suspense>
    </div>
  );
}
