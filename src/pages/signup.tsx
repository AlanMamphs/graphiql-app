import Link from 'next/link';
import { getSession, signIn } from 'next-auth/react';
import { SignUpForm, SignUpDataType } from '@/features/auth';
import { DangerAlert } from '@/components/ui/alert';
import { NextPageContext } from 'next';
import { useState } from 'react';
import { GoogleAuthButton } from '@/features/auth/components';

const Signup = () => {
  const [error, setError] = useState<string>();

  const parsedError = () => {
    if (error === 'auth/email-already-in-use') return 'Email already in use';

    return error;
  };

  const handleSignUp = async (data: SignUpDataType) => {
    const resp = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (resp.status === 200) {
      // Sign In right after successfull registration
      await signIn('credentials', {
        redirect: true,
        callbackUrl: '/playground',
        ...data,
      });
    }
    if (resp.status > 300) {
      const data = await resp.json();
      setError(data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center relative h-full w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      <SignUpForm onSubmit={handleSignUp} />
      {error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">Auth Error!</span> {parsedError()}
        </DangerAlert>
      )}
      <GoogleAuthButton />
      <p className="mt-4 dark:text-white">
        Already have an account?{' '}
        <Link href="/signin">
          <span className="text-blue-600 hover:underline">Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default Signup;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!!session) {
    return {
      redirect: {
        destination: '/playground',
      },
    };
  }
  return {
    props: {},
  };
};
