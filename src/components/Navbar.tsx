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
    <header className="sticky top-0 z-10 flex justify-between py-2 px-2">
      <Link className="w-fit flex gap-3" data-testid="nav-brand" href="/">
        <Image alt="Logo" width="40" height="40" src="/favicon.png" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          GraphiQL Editor
        </span>
      </Link>
      {user.isAuthenticated ? (
        <div className="flex justify-center items-center gap-2">
          <Link data-testid="nav-main-btn" href="/main">
            <Button variant="outline">Main</Button>
          </Link>
          <Button
            variant="outline"
            data-testid="nav-signout-btn"
            onClick={logout}
          >
            Sign Out
          </Button>
          <ModeToggle />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <Link href="/login">
            <Button variant="outline" data-testid="nav-signin-btn">
              Sign In
            </Button>
          </Link>
          <Link href="/login?signup=1">
            <Button variant="outline" data-testid="nav-signup-btn">
              Sign Up
            </Button>
          </Link>
          <ModeToggle />
        </div>
      )}
    </header>
  );
};
