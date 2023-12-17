import type { FC } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from './ui/button';
import Link from 'next/link';
import { ModeToggle } from './ThemeToggle';

export const NavbarComponent: FC<Record<string, never>> = function () {
  const { user, logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-10">
      <Link className="flex gap-3" data-testid="nav-brand" href="/">
        <Image alt="Logo" height="24" src="/favicon.png" width="24" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          GraphiQL Editor
        </span>
      </Link>
      {user.isAuthenticated ? (
        <>
          <Link data-testid="nav-main-btn" href="/main">
            <Button>Main</Button>
          </Link>
          <Button data-testid="nav-signout-btn" onClick={logout}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button data-testid="nav-signin-btn">Sign In</Button>
          </Link>
          <Link href="/login?signup=1">
            <Button data-testid="nav-signup-btn">Sign Up</Button>
          </Link>
        </>
      )}
      <ModeToggle />
    </header>
  );
};
