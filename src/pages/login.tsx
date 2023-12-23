import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { getProviders, getSession, signIn } from 'next-auth/react';
import {
  SignInForm,
  SignInDataType,
  SignUpForm,
  SignUpDataType,
} from '@/features/auth';
import { DangerAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';

const Login = (
  props: Awaited<ReturnType<typeof getServerSideProps>>['props']
) => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const isSignup = (router.query.signup ?? '0') === '1';

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

    return 'Unknown error';
  };
  const handleSignIn = async (data: SignInDataType) => {
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/playground',
      ...data,
    });
  };

  const handleSignUp = async (data: SignUpDataType) => {
    const resp = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      await signIn('credentials', {
        redirect: true,
        callbackUrl: '/playground',
        email: data.email,
        password: data.password,
      });
    }
    if (resp.status > 300) {
      const data = await resp.json();
      setError(data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center relative h-full w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      {props?.providers?.['credentials'] && isSignup ? (
        <SignUpForm onSubmit={handleSignUp} />
      ) : (
        <SignInForm onSubmit={handleSignIn} />
      )}
      {error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">Auth Error!</span> {parsedError()}
        </DangerAlert>
      )}
      {props?.providers?.google && (
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
      )}
      <p className="mt-4 dark:text-white">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <Link href="/login?signup=0">
              <span className="text-blue-600 hover:underline">Sign in</span>
            </Link>
          </>
        ) : (
          <>
            {' '}
            Don&apos;have an account?{' '}
            <Link href="/login?signup=1">
              <span className="text-blue-600 hover:underline">Sign up</span>
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;

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
    props: {
      session: session,
      providers: await getProviders(),
    },
  };
};
