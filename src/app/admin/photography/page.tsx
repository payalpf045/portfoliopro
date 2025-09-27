import { Suspense } from 'react';
import { getPhotographyImages } from '@/lib/db';
import PhotographyAdmin from '@/components/admin/photography-admin';
import { Skeleton } from '@/components/ui/skeleton';

function PhotographyAdminSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default async function AdminPhotographyPage() {
  const images = await getPhotographyImages();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-semibold">Photography</h1>
      <Suspense fallback={<PhotographyAdminSkeleton />}>
        <PhotographyAdmin images={images} />
      </Suspense>
    </div>
  );
}
