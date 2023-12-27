import { Button, ButtonProps } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const GoogleAuthButton = (props: ButtonProps) => (
  <Button
    onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
    variant="outline"
    {...props}
  >
    <Image
      height="24"
      width="24"
      alt="Google Provider"
      id="provider-logo"
      src="https://authjs.dev/img/providers/google.svg"
    />
    <span className="ml-2">Sign in with Google</span>
  </Button>
);
