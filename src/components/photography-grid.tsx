'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PhotographyImage } from '@/lib/definitions';
import { Lightbox } from './lightbox';

interface PhotographyGridProps {
  images: PhotographyImage[];
}

export default function PhotographyGrid({ images }: PhotographyGridProps) {
  const [selectedImage, setSelectedImage] = useState<PhotographyImage | null>(null);

  if (!images || images.length === 0) {
    return <p className="text-center text-muted-foreground">No images found.</p>;
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid cursor-pointer" onClick={() => setSelectedImage(image)}>
            <Image
              src={image.url}
              alt={image.title}
              width={800}
              height={1200}
              className="w-full h-auto object-cover rounded-lg transition-opacity hover:opacity-80"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={index < 8}
            />
          </div>
        ))}
      </div>
      <Lightbox
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
}
