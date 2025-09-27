import { Suspense } from 'react';
import { getPhotographyImages } from '@/lib/db';
import PhotographyAdmin from '@/components/admin/photography-admin';

export default async function AdminPhotographyPage() {
  const images = await getPhotographyImages();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-semibold">Photography</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PhotographyAdmin images={images} />
      </Suspense>
    </div>
  );
}
