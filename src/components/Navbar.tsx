import type { FC } from 'react';
import { DarkThemeToggle, Navbar, Button } from 'flowbite-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';

export const NavbarComponent: FC<Record<string, never>> = function () {
  const router = useRouter();
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-10">
      <Navbar fluid rounded>
        <Navbar.Brand as={Link} href="/" data-testid="nav-brand">
          <Image alt="Logo" height="24" src="/favicon.png" width="24" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            GraphiQL Editor
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {status === 'authenticated' ? (
            <>
              <Navbar.Link
                data-testid="nav-main-btn"
                href="/playground"
                active={router.pathname === '/'}
              >
                <Button>Main</Button>
              </Navbar.Link>
              <Button
                data-testid="nav-signout-btn"
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Navbar.Link as={Link} href="/login?signup=0">
                <Button data-testid="nav-signin-btn">Sign In</Button>
              </Navbar.Link>
              <Navbar.Link as={Link} href="/login?signup=1">
                <Button data-testid="nav-signup-btn">Sign Up</Button>
              </Navbar.Link>
            </>
          )}
          <li>
            <DarkThemeToggle data-testid="nav-light-dark-theme" />
          </li>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
