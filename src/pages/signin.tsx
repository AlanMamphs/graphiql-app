import { useRouter } from 'next/router';

import { getSession, signIn } from 'next-auth/react';
import { SignInForm, SignInDataType } from '@/features/auth';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';

const Signin = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error as string);
    }
  }, [router.query.error]);

  const parsedError = () => {
    if (error === 'auth/invalid-credential') return 'Invalid email or password';

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
    <div className="flex flex-col justify-center relative h-full min-h-full-main w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      <SignInForm onSubmit={handleSignIn} error={parsedError()} />
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
