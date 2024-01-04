import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGQLContext } from '../../context';

export const QueryEndpoint = () => {
  const {
    query,
    endpoint,
    runQuery,
    setEndpoint,
    queryError,
    headersError,
    variablesError,
  } = useGQLContext();
  return (
    <div data-testid="playground-query-endpoint">
      <fieldset className="flex">
        <Input
          className="mb-3 mr-3"
          onBlur={(e) => setEndpoint?.(e.target?.value as string)}
          defaultValue={endpoint}
        />
        <Button
          data-testid="playground-run-query"
          className="mx-3"
          disabled={Boolean(
            !query || queryError || headersError || variablesError
          )}
          onClick={runQuery}
          title={queryError || headersError || variablesError}
        >
          Query
        </Button>
      </fieldset>
    </div>
  );
};
