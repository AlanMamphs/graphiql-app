import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const VarsEditor = () => {
  const {
    variables,
    setVariables,
    variablesError,
    validateVariables,
    prettifyVariables,
  } = useGQLContext();
  return (
    <EditorComponent
      data-testid="playground-variables-editor"
      className="h-[15vh] overflow-auto relative flex-grow"
      syntaxError={variablesError}
      onBlur={validateVariables!}
      code={variables}
      onCodeChange={setVariables!}
      language={languages.JSON}
      contextMenuItems={[
        {
          text: 'Prettify',
          action: prettifyVariables!,
        },
      ]}
    />
  );
};
