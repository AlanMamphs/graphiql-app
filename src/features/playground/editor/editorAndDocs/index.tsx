import { Suspense, lazy, useEffect, useMemo, useState } from 'react';

import * as Tabs from '@/components/ui/tabs';
import apiClient from '@/lib/apiClient';
import { wrapPromise } from '@/lib/utils';

import { QueryEditor } from './queryEditor';
import { QueryEndpoint } from './queryEndpoint';
import { useGQLContext } from '../../context';

const DocsViewer = lazy(() => import('./schemaViewer'));
const docsResource = (endpoint: string) =>
  wrapPromise(apiClient.fetchDocs(endpoint));

export const EditorAndDocs = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { endpoint } = useGQLContext();
  const resource = useMemo(() => docsResource(endpoint), [endpoint]);

  if (!mounted) {
    return null;
  }
  return (
    <div data-testid="playground-editor-and-schema">
      <QueryEndpoint />
      <Tabs.Root defaultValue="docs" className="my-5">
        <Tabs.List aria-label="Schema and Editor ">
          <Tabs.Trigger value="docs">Schema</Tabs.Trigger>
          <Tabs.Trigger value="editor">Query Editor</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="editor">
          <QueryEditor />
        </Tabs.Content>
        <Tabs.Content value="docs">
          <Suspense fallback={<p>Loading...</p>}>
            <DocsViewer resource={resource} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
