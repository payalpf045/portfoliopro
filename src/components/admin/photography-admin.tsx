'use client';

import { useFormState } from 'react-dom';
import Image from 'next/image';
import { savePhotographyImage, deletePhotographyImage } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhotographyImage } from '@/lib/definitions';
import { useFormStatus } from 'react-dom';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = { message: '' };

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : 'Upload Image'}
    </Button>
  );
}

export default function PhotographyAdmin({ images }: { images: PhotographyImage[] }) {
  const [state, formAction] = useFormState(savePhotographyImage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
      if (!state.message.toLowerCase().includes('fail')) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Image Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image File</Label>
                <Input id="image" name="image" type="file" accept="image/*" required />
              </div>
              <UploadButton />
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
            <CardHeader><CardTitle>Existing Photos</CardTitle></CardHeader>
            <CardContent>
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group">
                        <Image
                            src={image.url}
                            alt={image.title}
                            width={200}
                            height={200}
                            className="rounded-md object-cover aspect-square"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <form action={deletePhotographyImage}>
                            <input type="hidden" name="id" value={image.id} />
                            <Button type="submit" variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                            </form>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No photos uploaded yet.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
