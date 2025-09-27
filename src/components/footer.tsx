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
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-headline text-lg font-semibold text-primary">
                PAYAL
              </span>
            </Link>
            <div className="flex gap-4">
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} PAYAL</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsLoginOpen(true)}>
              <Copyright className="h-4 w-4" />
              <span className="sr-only">Admin Login</span>
            </Button>
          </div>
        </div>
      </footer>
      <AdminLoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
}
