import apiClient from '@/lib/apiClient';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { GraphQLError, parse } from 'graphql';

type GraphQLContext = {
  headers: string;
  setHeaders?: (h: string) => void;
  headersError?: string;
  validateHeaders?: () => void;
  variables: string;
  setVariables?: (h: string) => void;
  variablesError?: string;
  validateVariables?: () => void;
  docs?: Record<string, unknown>;
  fetchDocs: () => void;
  query: string;
  runQuery: () => void;
  setQuery?: (q: string) => void;
  queryError?: string;
  validateQuery?: () => void;
  results?: Record<string, unknown>;
  endpoint: string;
  setEndpoint?: (e: string) => void;
};

export const GraphQLContext = createContext<GraphQLContext>({
  headers: '',
  query: '',
  variables: '',
  endpoint: '',
  fetchDocs: () => {
    throw new Error('Not implemented');
  },
  runQuery: () => {
    throw new Error('Not implemented');
  },
});

export const GraphQLProvider = (props: PropsWithChildren) => {
  const [query, setQuery] = useState<string>('');
  const [queryError, setQueryError] = useState<string>();

  const [headers, setHeaders] = useState<string>('');
  const [headersError, setHeadersError] = useState<string>();

  const [variables, setVariables] = useState<string>('');
  const [variablesError, setVariablesError] = useState<string>();

  const [endpoint, setEndpoint] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [docs, setDocs] = useState({});
  const [results, setResults] = useState({});

  const fetchDocs = useCallback(async () => {
    setDocs(await apiClient.fetchDocs(endpoint));
    await new Promise<string>((r) => setTimeout(r, 10000));
  }, [endpoint]);

  const runQuery = async () => {
    validateQuery();
    validateHeaders();
    validateVariables();

    if (queryError || headersError || variablesError) {
      return;
    }
    setResults(
      await apiClient.runQuery({
        query,
        endpoint,
        headers: JSON.parse(headers.trim() || '{}'),
        variables: JSON.parse(variables.trim() || '{}'),
      })
    );
  };

  const validateQuery = () => {
    if (query.trim() === '') {
      setQueryError(undefined);
      return;
    }
    try {
      parse(query);
      setQueryError(undefined);
    } catch (e) {
      const error = e as GraphQLError;
      setQueryError(`
      ${error.message} At position: line - ${error.locations?.[0].line},
      column - ${error.locations?.[0].column}
      `);
    }
  };

  const validateHeaders = () => {
    if (headers.trim() === '') {
      setHeadersError(undefined);
      return;
    }
    try {
      JSON.parse(headers);
      setHeadersError(undefined);
    } catch (e) {
      setHeadersError((e as Error).message);
    }
  };

  const validateVariables = () => {
    if (variables.trim() === '') {
      setVariablesError(undefined);
      return;
    }
    try {
      JSON.parse(variables);
      setVariablesError(undefined);
    } catch (e) {
      setVariablesError((e as Error).message);
    }
  };

  return (
    <GraphQLContext.Provider
      value={{
        query,
        setQuery,
        runQuery,
        queryError,
        validateQuery,
        docs,
        fetchDocs,
        headers,
        setHeaders,
        headersError,
        validateHeaders,
        variables,
        setVariables,
        variablesError,
        validateVariables,
        results,
        endpoint,
        setEndpoint,
      }}
    >
      {props.children}
    </GraphQLContext.Provider>
  );
};

export const useGQLContext = () => useContext(GraphQLContext);
