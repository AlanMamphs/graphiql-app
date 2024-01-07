import { Suspense, lazy, useEffect, useMemo, useState } from 'react';

import * as Tabs from '@/components/ui/tabs';
import apiClient from '@/lib/apiClient';
import { wrapPromise } from '@/lib/utils';

import { QueryEditor } from './queryEditor';
import { QueryEndpoint } from './queryEndpoint';
import { useGQLContext } from '../../context';
import { useLocale } from '@/context/Locale';

const DocsViewer = lazy(() => import('./schemaViewer'));
const docsResource = (endpoint: string) =>
  wrapPromise(apiClient.fetchDocs(endpoint));

export const EditorAndDocs = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { endpoint } = useGQLContext();
  const {
    state: {
      strings: { main },
    },
  } = useLocale();

  const resource = useMemo(() => docsResource(endpoint), [endpoint]);

  if (!mounted) {
    return null;
  }
  return (
    <div data-testid="playground-editor-and-schema">
      <QueryEndpoint />
      <Tabs.Root defaultValue="docs" className="my-5">
        <Tabs.List aria-label="Schema and Editor ">
          <Tabs.Trigger value="docs">{main.schema}</Tabs.Trigger>
          <Tabs.Trigger value="editor">{main.query_editor}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="editor">
          <QueryEditor />
        </Tabs.Content>
        <Tabs.Content value="docs">
          <Suspense fallback={<p>{main.loading}</p>}>
            <DocsViewer resource={resource} />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
