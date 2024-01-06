import { JsonViewer } from '@/components/JSONViewer';
import { useGQLContext } from '../context';

export const QueryViewer = () => {
  const { results } = useGQLContext();
  return (
    <div
      data-testid="playground-query-results"
      className="min-h-[45vh] h-[80vh] overflow-y-auto"
    >
      <JsonViewer obj={results ?? {}} />
    </div>
  );
};
