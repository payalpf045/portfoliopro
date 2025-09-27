import { getPhotographyImages } from '@/lib/db';
import PhotographyGrid from '@/components/photography-grid';
import { Suspense } from 'react';

export default async function PhotographyPage() {
  const images = await getPhotographyImages();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<p>Loading images...</p>}>
        <PhotographyGrid images={images} />
      </Suspense>
    </div>
  );
}
