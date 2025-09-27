import { getPhotographyImages } from '@/lib/db';
import PhotographyGrid from '@/components/photography-grid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function PhotographyGridSkeleton() {
  const heights = [250, 320, 280, 350, 220, 380, 300, 260];
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {heights.map((height, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" style={{ height: `${height}px` }}/>
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
