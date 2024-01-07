import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';
import { useLocale } from '@/context/Locale';

export const HeaderEditor = () => {
  const {
    headers,
    setHeaders,
    headersError,
    validateHeaders,
    prettifyHeaders,
  } = useGQLContext();

  const {
    state: {
      strings: { main },
    },
  } = useLocale();

  return (
    <EditorComponent
      data-testid="playground-headers-editor"
      className="h-[35vh] overflow-auto transition-all relative flex-grow"
      syntaxError={headersError}
      onBlur={validateHeaders!}
      code={headers}
      onCodeChange={setHeaders!}
      language={languages.JSON}
      contextMenuItems={[
        {
          text: main.format,
          action: prettifyHeaders!,
        },
      ]}
    />
  );
};
