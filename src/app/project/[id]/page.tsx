import { getProjectById } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/before-after-slider';
import { Badge } from '@/components/ui/badge';
import { Film, Droplets } from 'lucide-react';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-4">{project.title}</h1>
        <div className="mb-8">
            <Badge variant="secondary">
                {project.category === 'Film' ? <Film className="h-4 w-4 mr-2" /> : <Droplets className="h-4 w-4 mr-2" />}
                {project.category}
            </Badge>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">{project.description}</p>

        {project.category === 'Film' && project.youtubeVideoId && (
          <div className="mb-12">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${project.youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {project.category === 'Color Grading' && project.beforeImageUrl && project.afterImageUrl && (
          <div className="mb-12">
            <BeforeAfterSlider
              beforeImage={project.beforeImageUrl}
              afterImage={project.afterImageUrl}
            />
          </div>
        )}

        {project.category === 'Film' && project.stills && project.stills.length > 0 && (
          <div>
            <h2 className="text-3xl font-headline mb-6">Stills</h2>
            <div className="grid grid-cols-1 gap-6">
              {project.stills.map((still, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={still}
                    alt={`${project.title} still ${index + 1}`}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
    const { getProjects } = await import('@/lib/db');
    const projects = await getProjects();
   
    return projects.map((project) => ({
      id: project.id,
    }));
}
