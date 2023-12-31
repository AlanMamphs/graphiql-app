import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Editor } from '@/features/playground/editor';
import { QueryViewer } from '@/features/playground/queryViewer';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();

  useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/');
    },
  });

  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-10 dark:bg-gray-700 w-full"
    >
      <div className="grid">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <Editor />
          <QueryViewer />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default Main;
