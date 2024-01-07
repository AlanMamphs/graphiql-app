import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';
import { useLocale } from '@/context/Locale';

export const VarsEditor = () => {
  const {
    variables,
    setVariables,
    variablesError,
    validateVariables,
    prettifyVariables,
  } = useGQLContext();

  const {
    state: {
      strings: { main },
    },
  } = useLocale();

  return (
    <EditorComponent
      data-testid="playground-variables-editor"
      className="h-[35vh] overflow-auto relative flex-grow"
      syntaxError={variablesError}
      onBlur={validateVariables!}
      code={variables}
      onCodeChange={setVariables!}
      language={languages.JSON}
      contextMenuItems={[
        {
          text: main.format,
          action: prettifyVariables!,
        },
      ]}
    />
  );
};
