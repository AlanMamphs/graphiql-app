import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { SignUpForm, SignUpDataType } from '@/features/auth';
import { NextPageContext } from 'next';
import { useLocale } from '@/context/Locale';

const Signup = () => {
  const [error, setError] = useState<string>();
  const {
    state: {
      strings: { signupform },
    },
  } = useLocale();

  const parsedError = () => {
    if (error === 'auth/email-already-in-use') return signupform.email_error;

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
    <div className="flex flex-col justify-center relative h-full min-h-full-main w-full p-2 md:w-1/4 overflow-y-auto m-10 pb:12 mx-auto">
      <SignUpForm onSubmit={handleSignUp} error={parsedError()} />
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
