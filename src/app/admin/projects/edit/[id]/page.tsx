import { getProjectById } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProjectForm from '@/components/admin/project-form';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-headline font-semibold mb-6">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
