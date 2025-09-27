'use client';

import { useState, useTransition, useEffect, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/lib/definitions';
import { saveProject, generateThumbnailAction } from '@/lib/actions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SubmitButton } from './submit-button';
import Image from 'next/image';
import { fileToDataUri } from '@/lib/utils';
import { Sparkles, Upload } from 'lucide-react';

interface ProjectFormProps {
  project?: Project;
}

const initialState = {
  message: '',
  success: false,
};

export default function ProjectForm({ project }: ProjectFormProps) {
  const [state, formAction] = useActionState(saveProject, initialState);
  const [category, setCategory] = useState<string>(project?.category || 'Film');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(project?.thumbnail || null);
  const [hiddenThumbnail, setHiddenThumbnail] = useState<string>(project?.thumbnail || '');
  
  const [isGenerating, startTransition] = useTransition();
  const [descriptionForAI, setDescriptionForAI] = useState(project?.description || '');
  const [referenceImageFile, setReferenceImageFile] = useState<File | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Success', description: state.message });
        router.push('/admin');
      } else {
        toast({ title: 'Error', description: state.message, variant: 'destructive' });
      }
    }
  }, [state, toast, router]);

  const handleGenerateThumbnail = () => {
    startTransition(async () => {
      let refImageDataUri: string | undefined = undefined;
      if (referenceImageFile) {
        refImageDataUri = await fileToDataUri(referenceImageFile);
      }
      const result = await generateThumbnailAction(descriptionForAI, refImageDataUri);
      if (result.thumbnailDataUri) {
        setThumbnailPreview(result.thumbnailDataUri);
        setHiddenThumbnail(result.thumbnailDataUri);
        toast({ title: 'Thumbnail generated successfully!' });
      } else if (result.error) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      }
    });
  };

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="p-6 space-y-6">
          {project && <input type="hidden" name="id" value={project.id} />}
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={project?.title} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={project?.description} required onChange={(e) => setDescriptionForAI(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Film">Film</SelectItem>
                  <SelectItem value="Color Grading">Color Grading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" defaultValue={project ? new Date(project.date).toISOString().split('T')[0] : ''} required />
            </div>
          </div>

          {category === 'Film' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="youtubeVideoId">YouTube Video ID</Label>
                <Input id="youtubeVideoId" name="youtubeVideoId" defaultValue={project?.youtubeVideoId || ''} />
              </div>
              
              <div className="space-y-4 rounded-lg border p-4">
                  <Label>Thumbnail</Label>
                  <input type="hidden" name="thumbnail" value={hiddenThumbnail} />
                  {thumbnailPreview && (
                      <div className="w-48 aspect-video relative">
                          <Image src={thumbnailPreview} alt="Thumbnail preview" fill className="object-cover rounded-md" />
                      </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailFile">Upload Thumbnail</Label>
                    <Input id="thumbnailFile" name="thumbnailFile" type="file" accept="image/*" onChange={(e) => {
                      if(e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setThumbnailPreview(URL.createObjectURL(file));
                        setHiddenThumbnail(''); // Clear AI thumbnail if uploading
                      }
                    }} />
                  </div>
                  <div className="text-sm text-muted-foreground text-center my-2">OR</div>
                  <div className="space-y-2">
                      <Label>Generate with AI</Label>
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={(e) => setReferenceImageFile(e.target.files?.[0] || null)} />
                        <Button type="button" onClick={handleGenerateThumbnail} disabled={isGenerating} variant="outline">
                          <Sparkles className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                          {isGenerating ? 'Generating...' : 'Generate'}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Optionally provide a reference image for the AI.</p>
                  </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stills">Screenshot Stills</Label>
                <Input id="stills" name="stills" type="file" multiple accept="image/*" />
                {project?.stills && (
                    <div className="flex gap-2 mt-2">
                        {project.stills.map(still => (
                            <Image key={still} src={still} alt="still" width={100} height={56} className="rounded-md object-cover"/>
                        ))}
                    </div>
                )}
              </div>
            </div>
          )}

          {category === 'Color Grading' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="beforeImage">Before Image</Label>
                <Input id="beforeImage" name="beforeImage" type="file" accept="image/*" />
                {project?.beforeImageUrl && <Image src={project.beforeImageUrl} alt="before" width={200} height={112} className="rounded-md object-cover mt-2"/>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="afterImage">After Image</Label>
                <Input id="afterImage" name="afterImage" type="file" accept="image/*" />
                {project?.afterImageUrl && <Image src={project.afterImageUrl} alt="after" width={200} height={112} className="rounded-md object-cover mt-2"/>}
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
