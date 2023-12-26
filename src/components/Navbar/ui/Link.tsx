import Link from 'next/link';

import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  currentPath: string;
  children: ReactNode;
  dataTestId?: string;
}

const NavLink = ({ href, dataTestId, children }: LinkProps) => {
  return (
    <Link href={href} data-testid={dataTestId}>
      {children}
    </Link>
  );
};

export { NavLink };
