import { DarkThemeToggle } from 'flowbite-react';
import { NavigationButton } from './Button';
import { NavigationLink } from './Link';
import { useAuthContext } from '@/context/AuthContext';
import { ReactNode } from 'react';

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

  const cn = `flex ${dir[direction]} ${className}`;

  if (user.isAuthenticated) {
    return (
      <div className={cn}>
        <NavigationLink
          dataTestId="nav-main-btn"
          href="/main"
          currentPath={'/'}
        >
          <NavigationButton text="Main" />
        </NavigationLink>
        <NavigationButton
          text="Sign out"
          dataTestId="nav-signout-btn"
          onClick={logout}
        />
        <DarkThemeToggle data-testid="nav-light-dark-theme" />
      </div>
    );
  }

  return (
    <div className={cn}>
      <NavigationLink href="/login" currentPath={'/login'}>
        <NavigationButton text="Sign In" dataTestId="nav-signin-btn" />
      </NavigationLink>
      <NavigationLink href="/login?signup=1" currentPath={'/login'}>
        <NavigationButton text="Sign Up" dataTestId="nav-signup-btn" />
      </NavigationLink>
      <DarkThemeToggle data-testid="nav-light-dark-theme" />
    </div>
  );
};

export { Links };
