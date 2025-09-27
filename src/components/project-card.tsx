import Link from 'next/link';
import Image from 'next/image';
import { Film, Droplets } from 'lucide-react';
import { Project, ProjectCategory } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  'Film': <Film className="h-4 w-4" />,
  'Color Grading': <Droplets className="h-4 w-4" />,
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:shadow-accent/10 group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-2">
            {categoryIcons[project.category]}
            <span className="ml-2">{project.category}</span>
          </Badge>
          <CardTitle className="font-headline text-xl mb-2">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
