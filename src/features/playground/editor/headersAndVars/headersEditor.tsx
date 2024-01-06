import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const HeaderEditor = () => {
  const {
    headers,
    setHeaders,
    headersError,
    validateHeaders,
    prettifyHeaders,
  } = useGQLContext();
  return (
    <EditorComponent
      data-testid="playground-headers-editor"
      className="h-[15vh] overflow-auto relative flex-grow"
      syntaxError={headersError}
      onBlur={validateHeaders!}
      code={headers}
      onCodeChange={setHeaders!}
      language={languages.JSON}
      contextMenuItems={[
        {
          text: 'Prettify',
          action: prettifyHeaders!,
        },
      ]}
    />
  );
};
