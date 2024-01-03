import { EditorComponent } from '@/components/Editor';
import { useGQLContext } from '../../context';

export const QueryEditor = () => {
  const { query, setQuery, queryError, validateQuery } = useGQLContext();

  return (
    <div className=" h-[45vh] overflow-y-auto ">
      <EditorComponent
        syntaxError={queryError}
        className="bg-gray w-full break-words flex-grow"
        code={query}
        onCodeChange={setQuery!}
        onBlur={validateQuery!}
      />
    </div>
  );
};
