import { EditorComponent } from '@/components/Editor';
import { useGQLContext } from '../../context';
import { useLocale } from '@/context/Locale';
import { cn } from '@/lib/utils';

export const QueryEditor = ({ className }: { className?: string }) => {
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
      className={cn('overflow-y-auto flex-grow transition-all', className)}
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
