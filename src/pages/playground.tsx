import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

const Main = () => {
  const { data } = useSession();
  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-10 dark:bg-gray-900"
    >
      Main Page ${data?.user?.email}
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
      session: session,
    },
  };
}

export default Main;
