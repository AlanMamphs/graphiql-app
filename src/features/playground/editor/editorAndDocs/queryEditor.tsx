import { EditorComponent } from '@/components/Editor';
import { useGQLContext } from '../../context';
import { useLocale } from '@/context/Locale';

export const QueryEditor = () => {
  const { query, setQuery, queryError, validateQuery, prettifyQuery } =
    useGQLContext();

  const {
    state: {
      strings: { main },
    },
  } = useLocale();

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
          text: main.format,
          action: prettifyQuery!,
        },
      ]}
    />
  );
};
