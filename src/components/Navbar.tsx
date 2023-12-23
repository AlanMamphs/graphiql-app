import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from './ThemeToggle';

import { useSession, signOut } from 'next-auth/react';

export const NavbarComponent = () => {
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-10 flex justify-between py-2 px-2">
      <Link className="w-fit flex gap-3" data-testid="nav-brand" href="/">
        <Image alt="Logo" width="40" height="40" src="/favicon.png" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          GraphiQL Editor
        </span>
      </Link>
      {status === 'authenticated' ? (
        <div className="flex justify-center items-center gap-2">
          <Link data-testid="nav-main-btn" href="/playground">
            <Button variant="outline">Main</Button>
          </Link>
          <Button
            variant="outline"
            data-testid="nav-signout-btn"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            Sign Out
          </Button>
          <ModeToggle />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <Link href="/login?signup=0">
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
