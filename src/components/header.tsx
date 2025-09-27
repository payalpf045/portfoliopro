'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Projects' },
  { href: '/film', label: 'Film' },
  { href: '/color-grading', label: 'Color Grading' },
  { href: '/photography', label: 'Photography' },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const NavLink = ({ href, label, isMobile = false }: { href: string; label: string; isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        'font-body text-sm font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground',
        isMobile && 'text-lg py-2'
      )}
      onClick={() => isMobile && setIsSheetOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Desktop Header */}
        <div className="hidden md:flex w-full items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-headline text-lg font-semibold text-primary">
                PAYAL
                </span>
            </Link>

            <nav className="flex items-center space-x-6 text-sm font-medium">
                {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
                ))}
            </nav>
            
            {/* This empty div is for spacing, to keep the nav centered */}
            <div className="w-fit" style={{minWidth: '60px'}}></div>
        </div>

        {/* Mobile Header */}
        <div className="flex flex-1 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
             <span className="font-headline text-lg font-semibold text-primary">
              PAYAL
            </span>
          </Link>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" onClick={() => setIsSheetOpen(false)}>
                    <span className="font-headline text-lg font-semibold text-primary">
                      PAYAL
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col items-start space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} isMobile />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
