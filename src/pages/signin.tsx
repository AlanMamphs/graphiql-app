import { useRouter } from 'next/router';
import Link from 'next/link';

import { getSession, signIn } from 'next-auth/react';
import { SignInForm, SignInDataType } from '@/features/auth';
import { DangerAlert } from '@/components/ui/alert';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import { GoogleAuthButton } from '@/features/auth/components';

const Signin = () => {
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
    }

    return error;
  };
  const handleSignIn = async (data: SignInDataType) => {
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/playground',
      ...data,
    });
  };

  return (
    <div className="flex flex-col justify-center relative h-full w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      <SignInForm onSubmit={handleSignIn} />
      {error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">Auth Error!</span> {parsedError()}
        </DangerAlert>
      )}
      <GoogleAuthButton />
      <p className="mt-4 dark:text-white">
        Don&apos;have an account?{' '}
        <Link href="/signup">
          <span className="text-blue-600 hover:underline">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Signin;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  return {
    props: {},
  };
};
