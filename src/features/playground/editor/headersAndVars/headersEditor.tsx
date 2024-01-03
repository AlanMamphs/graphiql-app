import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const HeaderEditor = () => {
  const { headers, setHeaders, headersError, validateHeaders } =
    useGQLContext();
  return (
    <div className="h-[15vh] overflow-auto relative">
      <EditorComponent
        syntaxError={headersError}
        onBlur={validateHeaders!}
        code={headers}
        onCodeChange={setHeaders!}
        language={languages.JSON}
      />
    </div>
  );
};
