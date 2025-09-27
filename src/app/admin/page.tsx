import { Suspense } from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/db';
import ProjectsTable from '@/components/admin/projects-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

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

      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsTable projects={projects} />
      </Suspense>
    </div>
  );
}
