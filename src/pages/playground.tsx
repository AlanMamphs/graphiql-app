import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

import { JsonView, darkStyles, collapseAllNested } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const Main = () => {
  const { data } = useSession();
  const [endpoint] = useState('https://rickandmortyapi.com/graphql');
  const [docs, setDocs] = useState({});

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await fetch('/api/graphql_proxy/docs', {
        method: 'POST',
        body: JSON.stringify({ endpoint }),
      });
      setDocs(await response.json());
    };

    fetchDocs();
  }, [endpoint]);

  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-10 dark:bg-gray-900 "
    >
      Main Page {data?.user?.email}
      {docs && (
        <JsonView
          data={docs}
          shouldExpandNode={collapseAllNested}
          style={darkStyles}
        />
      )}
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
