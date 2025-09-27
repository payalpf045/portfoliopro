import Link from 'next/link';
import Image from 'next/image';
import { Film, Droplets } from 'lucide-react';
import { Project, ProjectCategory } from '@/lib/definitions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  'Film': <Film className="h-3 w-3" />,
  'Color Grading': <Droplets className="h-3 w-3" />,
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out bg-card border-border/50 rounded-lg">
        <div className="aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline text-xl text-primary">{project.title}</h3>
            <Badge variant="secondary" className="flex items-center gap-1.5 text-xs whitespace-nowrap">
              {categoryIcons[project.category]}
              {project.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
