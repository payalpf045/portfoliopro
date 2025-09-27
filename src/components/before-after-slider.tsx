'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);


  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-video select-none overflow-hidden rounded-lg",
        isDragging ? 'cursor-ew-resize' : 'cursor-default'
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Image
        src={beforeImage}
        alt="Before color grading"
        fill
        className="object-contain pointer-events-none"
        priority
      />
      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt="After color grading"
          fill
          className="object-contain pointer-events-none"
          priority
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary/80 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 h-9 w-9 rounded-full bg-primary/80 border-2 border-background ring-4 ring-primary/50 flex items-center justify-center cursor-ew-resize">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-background"><path d="M13 18l-6-6 6-6"/><path d="M11 6l6 6-6 6"/></svg>
        </div>
      </div>
    </div>
  );
}
