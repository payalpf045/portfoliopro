import { getPhotographyImages } from '@/lib/db';
import PhotographyGrid from '@/components/photography-grid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function PhotographyGridSkeleton() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" style={{ height: `${Math.floor(Math.random() * (400 - 200 + 1)) + 200}px` }}/>
      ))}
    </div>
  );
}

export default async function PhotographyPage() {
  const images = await getPhotographyImages();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<PhotographyGridSkeleton />}>
        <PhotographyGrid images={images} />
      </Suspense>
    </div>
  );
}
