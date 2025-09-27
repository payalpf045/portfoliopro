// This component is created to allow for child components in DropdownMenuItem which require 'use client'
'use client';
import { Trash2 } from 'lucide-react';
import { deleteProject } from '@/lib/actions';

export function DeleteProjectButton({ id }: { id: string }) {
    const deleteProjectWithId = deleteProject.bind(null);
    return (
        <form action={deleteProjectWithId}>
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="flex items-center w-full text-sm text-destructive relative select-none items-center rounded-sm px-2 py-1.5 outline-none transition-colors hover:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </button>
        </form>
    );
}