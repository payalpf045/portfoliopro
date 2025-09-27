'use client';

import { Copyright, Mail, Instagram, GitMerge } from 'lucide-react';
import Link from 'next/link';
import { AdminLoginDialog } from './admin/admin-login-dialog';
import { useState } from 'react';
import { Button } from './ui/button';

export function Footer() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border/40">
        <div className="container flex items-start justify-between py-10 md:h-24 md:items-center">
          <div>
            <span className="font-headline text-lg font-semibold text-primary">
              PAYAL
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-transparent"
                onClick={() => setIsLoginOpen(true)}
              >
                <Copyright className="h-4 w-4" />
                <span className="sr-only">Admin Login</span>
              </Button>
              <span>{new Date().getFullYear()}. All Rights Reserved.</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="mailto:hello@payal.art" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Mail</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://discord.com" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <GitMerge className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Discord</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
      <AdminLoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
}
