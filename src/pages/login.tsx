import { useMemo } from 'react';
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
import { Alert, Button } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { NextPageContext } from 'next';

const Login = (
  props: Awaited<ReturnType<typeof getServerSideProps>>['props']
) => {
  const router = useRouter();
  const error = router.query.error;
  const isSignup = (router.query.signup ?? '0') === '1';

  const parsedError = useMemo(() => {
    switch (error) {
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
    }

    return 'Unknown error';
  }, [error]);
  const handleSignIn = async (data: SignInDataType) => {
    await signIn('credentials', {
      redirect: true,
      callbackUrl: '/',
      ...data,
    });

    return false;
  };

  const handleSignUp = async (data: SignUpDataType) => {
    try {
      await signIn('credentials', {
        redirect: true,
        callbackUrl: '/',

        ...data,
      });
    } catch (err) {
      debugger;
      console.error(err);
    }

    return false;
  };
  return (
    <div className="flex flex-col justify-center relative h-full w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      {error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Auth Error!</span> {parsedError}
        </Alert>
      )}

      {props?.providers?.['credentials'] && isSignup ? (
        <SignUpForm onSubmit={handleSignUp} />
      ) : (
        <SignInForm onSubmit={handleSignIn} />
      )}
      {props?.providers?.google && (
        <Button
          onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
          outline
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
