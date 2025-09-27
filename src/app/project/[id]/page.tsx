import { getProjectById } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/before-after-slider';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">

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

        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{project.description}</p>
        </div>
        
        {project.category === 'Color Grading' && project.beforeImageUrl && project.afterImageUrl && (
          <div className="mb-12">
            <BeforeAfterSlider
              beforeImage={project.beforeImageUrl}
              afterImage={project.afterImageUrl}
            />
          </div>
        )}

        {project.category === 'Film' && project.stills && project.stills.length > 0 && (
          <div className="text-center">
            <h2 className="text-3xl font-headline mb-8">Stills Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.stills.map((still, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <Image
                    src={still}
                    alt={`${project.title} still ${index + 1}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover aspect-video"
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