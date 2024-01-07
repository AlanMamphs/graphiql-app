import { JsonViewer } from '@/components/JSONViewer';
import { cn } from '@/lib/utils';

export const SchemaViewer = ({
  resource,
  className,
}: {
  resource: { read: () => Record<string, unknown> };
  className: string;
}) => {
  const docs = resource.read();

  return (
    <div
      data-testid="playground-schema-viewer"
      className={cn('p-3 overflow-y-auto transition-all', className)}
    >
      <JsonViewer obj={docs ?? {}} />
    </div>
  );
};

export default SchemaViewer;
