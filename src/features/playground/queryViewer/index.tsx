import { JsonViewer } from '@/components/JSONViewer';
import { useGQLContext } from '../context';
import { useLocale } from '@/context/Locale';

export const QueryViewer = () => {
  const { results, resultsLoading } = useGQLContext();

  const {
    state: {
      strings: { main },
    },
  } = useLocale();

  return (
    <div
      data-testid="playground-query-results"
      className="min-h-[45vh] h-[87vh] overflow-y-auto shadow-2xl"
    >
      {results && !resultsLoading ? (
        <JsonViewer obj={results} />
      ) : (
        <div className="text-center my-auto h-full flex items-center justify-center">
          {resultsLoading ? main.loading : main.start_querying}
        </div>
      )}
    </div>
  );
};
