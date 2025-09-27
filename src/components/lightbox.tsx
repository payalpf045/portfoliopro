'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { PhotographyImage } from '@/lib/definitions';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: PhotographyImage | null;
}

export function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-0 bg-transparent max-w-none w-auto h-auto shadow-none">
        {image && (
          <>
            <DialogTitle asChild>
              <VisuallyHidden>
                <h2>{image.title}</h2>
              </VisuallyHidden>
            </DialogTitle>
            <div className="relative w-screen h-screen p-4 md:p-8">
               <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
               />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
