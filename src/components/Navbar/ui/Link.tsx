import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  currentPath: string;
  children: ReactNode;
  dataTestId?: string;
}

const NavigationLink = ({
  href,
  currentPath,
  dataTestId,
  children,
}: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === currentPath;

  return (
    <Navbar.Link
      data-testid={dataTestId}
      as={Link}
      href={href}
      active={isActive}
    >
      {children}
    </Navbar.Link>
  );
};

export { NavigationLink };
