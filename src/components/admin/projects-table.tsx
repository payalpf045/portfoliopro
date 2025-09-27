import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Project, ProjectCategory } from '@/lib/definitions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Film, Droplets, MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteProjectButton } from './delete-button';

interface ProjectsTableProps {
  projects: Project[];
}

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
    'Film': <Film className="h-4 w-4" />,
    'Color Grading': <Droplets className="h-4 w-4" />,
};

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={64}
                    height={40}
                    className="rounded-md object-cover aspect-video"
                  />
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                   <Badge variant="outline" className="flex items-center w-fit">
                    {categoryIcons[project.category]}
                    <span className="ml-2">{project.category}</span>
                   </Badge>
                </TableCell>
                <TableCell>{format(new Date(project.date), 'MMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/projects/edit/${project.id}`} className="flex items-center">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteProjectButton id={project.id}/>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
