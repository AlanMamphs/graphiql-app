import { EditorComponent, languages } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const VarsEditor = () => {
  const { variables, setVariables, variablesError, validateVariables } =
    useGQLContext();
  return (
    <div className="h-[15vh] overflow-auto">
      <EditorComponent
        syntaxError={variablesError}
        onBlur={validateVariables!}
        code={variables}
        onCodeChange={setVariables!}
        language={languages.JSON}
      />
    </div>
  );
};
