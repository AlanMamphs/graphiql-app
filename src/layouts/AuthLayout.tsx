import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DangerAlert } from '@/components/ui/alert';
import { GoogleAuthButton } from '@/features/auth/components';

const AuthLayout = (props: PropsWithChildren) => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error as string);
    }
  }, [router.query.error]);

  const parsedError = () => {
    switch (error) {
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
    }

    return error;
  };

  return (
    <div className="flex flex-col justify-center relative h-full w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      {props.children}
      {error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">Auth Error!</span> {parsedError()}
        </DangerAlert>
      )}
      <GoogleAuthButton />
    </div>
  );
};

export { AuthLayout };
