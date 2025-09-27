'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Images, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { clearAuthentication } from '@/lib/auth';

const adminNavLinks = [
  { href: '/admin', label: 'Projects', icon: LayoutDashboard },
  { href: '/admin/photography', label: 'Photography', icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearAuthentication();
    router.replace('/');
  };

  return (
    <aside className="w-64 bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <Link href="/">
          <h1 className="font-headline text-2xl font-semibold text-primary">PAYAL</h1>
          <span className="text-sm text-muted-foreground">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
