import apiClient from '@/lib/apiClient';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { GraphQLError, parse } from 'graphql';

type GraphQLContext = {
  headers: string;
  setHeaders?: (h: string) => void;
  headersError?: string;
  validateHeaders?: () => void;
  prettifyHeaders?: () => void;
  variables: string;
  setVariables?: (h: string) => void;
  variablesError?: string;
  validateVariables?: () => void;
  prettifyVariables?: () => void;
  docs?: Record<string, unknown>;
  fetchDocs?: () => void;
  query: string;
  runQuery?: () => void;
  setQuery?: (q: string) => void;
  queryError?: string;
  validateQuery?: () => void;
  prettifyQuery?: () => void;
  results?: Record<string, unknown>;
  resultsError?: string;
  resultsLoading?: boolean;
  errorToastOpen?: boolean;
  setErrorToastOpen?: (a: boolean) => void;
  endpoint: string;
  setEndpoint?: (e: string) => void;
};

export const GraphQLContext = createContext<GraphQLContext>({
  headers: '',
  query: '',
  variables: '',
  endpoint: '',
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
  const [results, setResults] = useState<Record<string, unknown>>();
  const [resultsLoading, setResultsLoading] = useState<boolean>(false);
  const [resultsError, setResultsError] = useState<string>();
  const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);

  const fetchDocs = async () => {
    setDocs(await apiClient.fetchDocs(endpoint));
    await new Promise<string>((r) => setTimeout(r, 10000));
  };

  const runQuery = async () => {
    validateQuery();
    validateHeaders();
    validateVariables();

    if (queryError || headersError || variablesError) {
      return;
    }

    try {
      setResultsLoading(true);
      const response = await apiClient.runQuery({
        query,
        endpoint,
        headers: JSON.parse(headers.trim() || '{}'),
        variables: JSON.parse(variables.trim() || '{}'),
      });

      setResults(response);

      if (response.errors) {
        setResultsError(
          response.errors.map((e: { message: string }) => e.message).join('\n')
        );
        setErrorToastOpen(true);
      } else {
        setResultsError(undefined);
      }
    } catch (e) {
      setResults({
        message: (e as Error).message,
      });
      setResultsError((e as Error).message);
      setErrorToastOpen(true);
    } finally {
      setResultsLoading(false);
    }
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

  const __prettifyJSON = (json: string) => {
    let prettifiedJson = json.trim().replaceAll("'", '"');
    try {
      prettifiedJson = JSON.stringify(JSON.parse(prettifiedJson), null, 2);
      return prettifiedJson;
    } catch (e) {
      // Return at least trimmed version
      return prettifiedJson;
    }
  };

  const prettifyHeaders = () => {
    setHeaders(__prettifyJSON(headers));
    validateHeaders();
  };

  const prettifyVariables = () => {
    setVariables(__prettifyJSON(variables));
    validateVariables();
  };

  const prettifyQuery = () => {
    const trimmed = query.replace(/\s+/g, ' ').trim();
    const separatedLines: string[] = [];
    let identationLevel = '';
    let currentLine = '';
    let prevChar = '';

    for (const char of trimmed) {
      if (char === '{' || char === '(') {
        separatedLines.push(identationLevel + currentLine + char);
        identationLevel += '  ';
        currentLine = '';
      } else if (char === '}' || char === ')') {
        separatedLines.push(identationLevel + currentLine);
        identationLevel = identationLevel.slice(0, -2);
        separatedLines.push(identationLevel + char);
        currentLine = '';
      } else if (
        prevChar !== ':' &&
        char === ' ' &&
        identationLevel.length >= 4 &&
        !Boolean(currentLine.trim() === '')
      ) {
        separatedLines.push(identationLevel + currentLine.trim());
        currentLine = '';
      } else {
        currentLine += char;
      }
      prevChar = char;
    }

    // If there is any remaining content, add it to the result
    if (currentLine.trim() !== '') {
      separatedLines.push(currentLine);
    }
    setQuery(separatedLines.filter((s) => s.trim() !== '').join('\n'));
  };

  return (
    <GraphQLContext.Provider
      value={{
        query,
        setQuery,
        runQuery,
        queryError,
        validateQuery,
        prettifyQuery,
        docs,
        fetchDocs,
        headers,
        setHeaders,
        headersError,
        validateHeaders,
        prettifyHeaders,
        variables,
        setVariables,
        variablesError,
        validateVariables,
        prettifyVariables,
        results,
        resultsError,
        resultsLoading,
        errorToastOpen,
        setErrorToastOpen,
        endpoint,
        setEndpoint,
      }}
    >
      {props.children}
    </GraphQLContext.Provider>
  );
};

export const useGQLContext = () => useContext(GraphQLContext);
