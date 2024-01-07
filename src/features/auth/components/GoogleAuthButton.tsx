import { Button, ButtonProps } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useLocale } from '@/context/Locale';

export const GoogleAuthButton = (props: ButtonProps) => {
  const { state } = useLocale();
  return (
    <Button
      onClick={() =>
        signIn('google', { redirect: true, callbackUrl: '/playground' })
      }
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
      <span className="ml-2">{state.strings.googleauthbutton.sign}</span>
    </Button>
  );
};
