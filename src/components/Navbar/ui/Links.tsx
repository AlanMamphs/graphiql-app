import { NavigationButton } from './Button';
import { NavigationLink } from './Link';
import { useAuthContext } from '@/context/AuthContext';

const Links = () => {
  const { user, logout } = useAuthContext();

  if (user.isAuthenticated) {
    return (
      <>
        <NavigationLink
          data-testid="nav-main-btn"
          href="/main"
          currentPath={'/'}
        >
          <NavigationButton text="Main" />
        </NavigationLink>

        <NavigationButton
          text="Sign out"
          data-testid="nav-signout-btn"
          onClick={logout}
        />
      </>
    );
  }

  return (
    <>
      <NavigationLink href="/login" currentPath={'/login'}>
        <NavigationButton text="Sign In" data-testid="nav-signin-btn" />
      </NavigationLink>
      <NavigationLink href="/login?signup=1" currentPath={'/login'}>
        <NavigationButton text="Sign Up" data-testid="nav-signup-btn" />
      </NavigationLink>
    </>
  );
};

export { Links };
