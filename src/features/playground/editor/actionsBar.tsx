import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGQLContext } from '../context';
import { PropsWithChildren } from 'react';
import { Play } from 'lucide-react';
export const ActionsBar = (props: PropsWithChildren) => {
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
        {props.children}
        <Button
          data-testid="playground-run-query"
          className="mx-3"
          variant="outline"
          disabled={Boolean(
            !query || queryError || headersError || variablesError
          )}
          onClick={runQuery}
          title={queryError || headersError || variablesError}
        >
          <Play />
        </Button>
      </fieldset>
    </div>
  );
};
