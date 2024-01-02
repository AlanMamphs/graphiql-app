import { useEffect, useRef, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { EditorComponent, languages } from '@/components/Editor';
import { Input } from '@/components/ui/input';
import { PlayCircle } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  JsonView,
  defaultStyles,
  darkStyles,
  allExpanded,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useTheme } from 'next-themes';


import { Button } from '@/components/ui/button';

const HeadersAndVars = (props: {
  headers: string;
  onHeadersChange: (headers: string) => void;
  variables: string;
  onVariablesChange: (variables: string) => void;
}) => (
  <Tabs.Root
    className="flex flex-col shadow-[0_2px_10px] w-full"
    defaultValue="headers"
  >
    <Tabs.List
      className="shrink-0 flex border-b border-mauve6"
      aria-label="GraphQL Headers"
    >
      <Tabs.Trigger
        className="px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-white outline-none cursor-default"
        value="headers"
      >
        Headers
      </Tabs.Trigger>
      <Tabs.Trigger
        className=" px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-white outline-none cursor-default"
        value="variables"
      >
        Variables
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-white"
      value="headers"
    >
      <EditorComponent
        code={props.headers}
        onCodeChange={props.onHeadersChange}
        language={languages.JSON}
        className=" bg-slate-100"
      />
    </Tabs.Content>
    <Tabs.Content
      className="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-white"
      value="variables"
    >
      <EditorComponent
        code={props.variables}
        onCodeChange={props.onVariablesChange}
        language={languages.JSON}
      />
    </Tabs.Content>
  </Tabs.Root>
);

const Main = () => {
  const [query, setGQLQuery] = useState<string>('');
  const [headers, setHeaders] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const { resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>();
  const [endpoint, setEndpoint] = useState('https://api.github.com/graphql');
  const [docs, setDocs] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await fetch('/api/graphql_proxy/docs', {
        method: 'POST',
        body: JSON.stringify({ endpoint }),
      });
      setDocs(await response.json());
      console.log(docs);
    };

    fetchDocs();
  }, [endpoint]);

  const handleQuery = async () => {
    const response = await fetch('/api/graphql_proxy/query', {
      method: 'POST',
      body: JSON.stringify({
        query,
        endpoint,
        headers: JSON.parse(headers ?? '{}'),
        variables: JSON.parse(variables ?? '{}'),
      }),
    });
    setResults(await response.json());
    console.log(results);
  };

  return (
    <div
      data-testid="main-page"
      className="text-center bg-gray-50 my-10 dark:bg-gray-900 w-full"
    >
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-4 p-3 overflow-y-hidden">
          <div className="h-full min-h-full-main text-left">
            <div className="flex flex-row">
              <div className="flex flex-col flex-grow">
                <fieldset>
                  <Input
                    className="mb-3"
                    ref={inputRef}
                    defaultValue={endpoint}
                  />
                  <Button
                    onClick={() => setEndpoint(inputRef.current?.value ?? '')}
                  >
                    Set Endpoint{' '}
                  </Button>
                </fieldset>
                <EditorComponent
                  className="bg-gray w-full h-full min-h-[45vh] overflow-y-auto break-words flex-grow"
                  code={query}
                  onCodeChange={setGQLQuery}
                />
                <HeadersAndVars
                  headers={headers}
                  onHeadersChange={setHeaders}
                  variables={variables}
                  onVariablesChange={setVariables}
                />
              </div>
              <PlayCircle
                onClick={handleQuery}
                className="cursor-pointer  h-10 w-10"
              />
            </div>
          </div>
          <div className="h-full text-left">
            <JsonView
              shouldExpandNode={allExpanded}
              data={results}
              style={
                resolvedTheme === 'light' ? defaultStyles : { ...darkStyles }
              }
            />
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
