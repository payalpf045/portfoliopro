'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-video select-none group">
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={beforeImage}
          alt="Before color grading"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div
          className="absolute top-0 left-0 h-full w-full rounded-lg overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={afterImage}
            alt="After color grading"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary/50 cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 h-4 w-4 rounded-full bg-primary ring-2 ring-background"></div>
        </div>
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={0.1}
        onValueChange={(value) => setSliderPosition(value[0])}
        className="absolute -bottom-2 left-0 right-0 w-full opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
