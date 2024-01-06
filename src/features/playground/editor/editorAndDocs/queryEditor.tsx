import { EditorComponent } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const QueryEditor = () => {
  const { query, setQuery, queryError, validateQuery, prettifyQuery } =
    useGQLContext();

  return (
    <EditorComponent
      data-testid="playground-query-editor"
      syntaxError={queryError}
      className="h-[45vh] overflow-y-auto flex-grow"
      code={query}
      onCodeChange={setQuery!}
      onBlur={validateQuery!}
      contextMenuItems={[
        {
          text: 'Prettify',
          action: prettifyQuery!,
        },
      ]}
    />
  );
};
