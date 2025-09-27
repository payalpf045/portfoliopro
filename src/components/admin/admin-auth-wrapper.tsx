'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/');
    } else {
      setIsVerified(true);
    }
  }, [router, pathname]);

  if (!isVerified) {
    return (
      <div className="flex min-h-screen p-8">
        <div className="w-64">
           <Skeleton className="h-10 w-full mb-4" />
           <Skeleton className="h-8 w-full mb-2" />
           <Skeleton className="h-8 w-full mb-2" />
        </div>
        <div className="flex-1 ml-8">
            <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
