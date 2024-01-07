import { useRouter } from 'next/router';

import { getSession, signIn } from 'next-auth/react';
import { SignInForm, SignInDataType } from '@/features/auth';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import { useLocale } from '@/context/Locale';

const Signin = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    state: {
      strings: { signinform },
    },
  } = useLocale();

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error as string);
    }
  }, [router.query.error]);

  const parsedError = () => {
    if (error === 'auth/invalid-credential') return signinform.invalid_creds;
    if (error === 'SessionRequired') return signinform.session_expired;


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
    <div className="flex flex-col justify-center relative h-full min-h-full-main w-full p-2 md:w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
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
