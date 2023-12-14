import { NavigationButton } from './Button';
import { NavigationLink } from './Link';
import { useAuthContext } from '@/context/AuthContext';

const Links = () => {
  const { user, logout } = useAuthContext();

  if (user.isAuthenticated) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <NavigationLink href="/login" currentPath={'/login'}>
        <NavigationButton text="Sign In" dataTestId="nav-signin-btn" />
      </NavigationLink>
      <NavigationLink href="/login?signup=1" currentPath={'/login'}>
        <NavigationButton text="Sign Up" dataTestId="nav-signup-btn" />
      </NavigationLink>
    </>
  );
};

export { Links };
