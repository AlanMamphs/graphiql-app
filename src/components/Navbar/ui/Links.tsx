import { cn } from '@/lib/utils';
import { NavButton } from './Button';
import { NavLink } from './Link';
import { useAuthContext } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { ModeToggle } from '@/components/ThemeToggle';

const Links = ({
  direction = 'row',
  className,
}: {
  direction?: 'row' | 'col';
  className?: ReactNode;
}) => {
  const { user, logout } = useAuthContext();
  const dir = {
    row: 'flex-row items-center',
    col: 'flex-col justify-center',
  };

  if (user.isAuthenticated) {
    return (
      <div className={cn('flex', dir[direction], className)}>
        <NavLink dataTestId="nav-main-btn" href="/main" currentPath="/">
          <NavButton text="Main" />
        </NavLink>

        <NavLink dataTestId="nav-main-btn" href="/" currentPath="/">
          <NavButton
            text="Sign out"
            dataTestId="nav-signout-btn"
            onClick={logout}
          />
        </NavLink>

        <ModeToggle />
      </div>
    );
  }

  return (
    <div className={cn('flex', dir[direction], className)}>
      <NavLink href="/login" currentPath={'/login'}>
        <NavButton text="Sign In" dataTestId="nav-signin-btn" />
      </NavLink>

      <NavLink href="/login?signup=1" currentPath={'/login'}>
        <NavButton text="Sign Up" dataTestId="nav-signup-btn" />
      </NavLink>

      <ModeToggle />
    </div>
  );
};

export { Links };
