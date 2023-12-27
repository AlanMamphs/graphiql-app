import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const GoogleAuthButton = () => (
  <Button
    onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
    variant="outline"
    className="mt-4"
  >
    <Image
      height="24"
      width="24"
      alt="Google Provider"
      id="provider-logo"
      src="https://authjs.dev/img/providers/google.svg"
    />
    <span>Sign in with Google</span>
  </Button>
);
