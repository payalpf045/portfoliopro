import { Project } from '@/lib/definitions';
import ProjectCard from './project-card';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return <p className="text-center text-muted-foreground">No projects found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
