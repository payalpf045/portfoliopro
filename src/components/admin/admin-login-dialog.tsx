'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { checkPassword, setAuthenticated } from '@/lib/auth';

interface AdminLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminLoginDialog({ open, onOpenChange }: AdminLoginDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setAuthenticated();
      toast({ title: 'Login successful' });
      onOpenChange(false);
      router.push('/admin');
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle className="font-headline">Admin Access</DialogTitle>
            <DialogDescription>
              Enter the password to access the content management panel.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password-input" className="text-right">
                Password
              </Label>
              <Input
                id="password-input"
                type="password"
                className="col-span-3"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
            {error && <p className="text-sm text-destructive text-center col-span-4">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
