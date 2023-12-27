import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { NavButton } from './Button';
import { NavLink } from './Link';
import { ReactNode } from 'react';
import { ModeToggle } from '@/components/ThemeToggle';

interface Props {
  direction?: 'row' | 'col';
  className?: ReactNode;
}

const Links = ({ direction = 'row', className }: Props) => {
  const { status } = useSession();
  const dir = {
    row: 'flex-row items-center',
    col: 'flex-col justify-center',
  };

  if (status === 'authenticated') {
    return (
      <div className={cn('flex', dir[direction], className)}>
        <NavLink href="/playground">
          <NavButton text="Main" dataTestId="nav-main-btn" />
        </NavLink>

        <NavLink href="/">
          <NavButton
            text="Sign out"
            dataTestId="nav-signout-btn"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          />
        </NavLink>

        <ModeToggle />
      </div>
    );
  }

  return (
    <div className={cn('flex', dir[direction], className)}>
      <NavLink href="/signin">
        <NavButton text="Sign In" dataTestId="nav-signin-btn" />
      </NavLink>

      <NavLink href="/signup">
        <NavButton text="Sign Up" dataTestId="nav-signup-btn" />
      </NavLink>

      <ModeToggle />
    </div>
  );
};

export { Links };
