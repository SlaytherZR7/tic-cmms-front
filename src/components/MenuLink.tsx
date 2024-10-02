'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

export interface MenuLinkProps {
  name: string;
  href: string;
  icon: React.ReactNode;
  newItemsCount?: number;
}

export const MenuLink = ({
  name,
  href,
  icon,
  newItemsCount,
}: MenuLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === `/dashboard/${href}`;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
        text-muted-foreground ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'hover:text-foreground'
        }
      `}
    >
      <span className='h-4 w-4'>{icon}</span>
      {name}
      {newItemsCount !== undefined && (
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          {newItemsCount}
        </Badge>
      )}
    </Link>
  );
};
