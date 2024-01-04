import { JsonViewer } from '@/components/JSONViewer';

export const SchemaViewer = ({
  resource,
}: {
  resource: { read: () => Record<string, unknown> };
}) => {
  const docs = resource.read();

  return (
    <div
      data-testid="playground-schema-viewer"
      className="h-[45vh] p-3 overflow-y-auto"
    >
      <JsonViewer obj={docs ?? {}} />
    </div>
  );
};

export default SchemaViewer;
