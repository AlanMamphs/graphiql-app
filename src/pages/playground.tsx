import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { Editor } from '@/features/playground/editor';
import { QueryViewer } from '@/features/playground/queryViewer';

const Main = () => {
  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-10 dark:bg-gray-900 w-full"
    >
      <div className="grid">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <div className="min-h-[40vh] text-left">
            <Editor />
          </div>
          <div className="h-full text-left">
            <QueryViewer />
          </div>
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
    props: {},
  };
}

export default Main;
