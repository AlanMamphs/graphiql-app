import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { NavButton } from './Button';
import { NavLink } from './Link';
import { ReactNode } from 'react';
import { ModeToggle } from '@/components/ThemeToggle';
import { LocaleToggle } from '@/components/LocaleToggle';
import { useLocale } from '@/context/Locale';

interface Props {
  direction?: 'row' | 'col';
  className?: ReactNode;
}

const Links = ({ direction = 'row', className }: Props) => {
  const { status } = useSession();
  const {
    state: {
      strings: { sign: text },
    },
  } = useLocale();
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
            text={text.sign_out}
            dataTestId="nav-signout-btn"
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          />
        </NavLink>

        <ModeToggle />
        <LocaleToggle />
      </div>
    );
  }

  return (
    <div className={cn('flex', dir[direction], className)}>
      <NavLink href="/signin">
        <NavButton text={text.sign_in} dataTestId="nav-signin-btn" />
      </NavLink>

      <NavLink href="/signup">
        <NavButton text={text.sign_up} dataTestId="nav-signup-btn" />
      </NavLink>

      <ModeToggle />
      <LocaleToggle />
    </div>
  );
};

export { Links };
