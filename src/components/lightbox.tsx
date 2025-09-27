'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from '@/components/ui/dialog';
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
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="p-0 border-0 bg-transparent max-w-none w-auto h-auto shadow-none !rounded-none focus-visible:outline-none">
        {image && (
          <>
            <DialogTitle asChild>
              <VisuallyHidden>
                <h2>{image.title}</h2>
              </VisuallyHidden>
            </DialogTitle>
            <div className="relative w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]">
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
