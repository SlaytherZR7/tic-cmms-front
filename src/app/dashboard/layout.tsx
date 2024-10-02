import Link from 'next/link';
import { Hammer, Menu, NotebookPen, Package2, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuLink, MenuLinkProps } from '../../components/MenuLink';
import { UserMenu } from '@/components/UserMenu';

const links: MenuLinkProps[] = [
  {
    name: 'Ordenes de trabajo',
    href: 'work-orders',
    icon: <NotebookPen className='h-4 w-4' />,
  },
  {
    name: 'Ordenes de trabajo preventivo',
    href: 'preventive-work-orders',
    icon: <ShieldCheck className='h-4 w-4' />,
  },
  {
    name: 'Gestión de activos',
    href: 'asset-management',
    icon: <Hammer className='h-4 w-4' />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>TIC - CMMS</span>
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {links.map((link) => (
                <MenuLink
                  key={link.href}
                  name={link.name}
                  href={link.href}
                  icon={link.icon}
                  newItemsCount={link.newItemsCount}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                {links.map((link) => (
                  <MenuLink
                    key={link.href}
                    name={link.name}
                    href={link.href}
                    icon={link.icon}
                    newItemsCount={link.newItemsCount}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className='flex flex-1 justify-end'>
            <UserMenu />
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
