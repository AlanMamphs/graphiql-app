import { JsonViewer } from '@/components/JSONViewer';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

const obj = {
  string: 'This is a string',
  number: 42,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined,
  array: ['element1', 'element2'],
  object: {
    key: 'value',
    value: {
      object: { key: 'value' },
      array: ['element1', 'element2'],
      undefinedValue: undefined,
      nullValue: null,
      boolean: true,
      number: 42,
      string: 'This is a string',
    },
  },
};

const Main = () => {
  const validatedObject = JSON.parse(JSON.stringify(obj));

  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-2 mx-2 py-2 px-2 dark:bg-gray-900"
    >
      <JsonViewer obj={validatedObject} />
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
