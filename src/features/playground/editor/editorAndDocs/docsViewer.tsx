import { JsonViewer } from '@/components/JSONViewer';

export const DocsViewer = ({
  resource,
}: {
  resource: { read: () => Record<string, unknown> };
}) => {
  const docs = resource.read();

  return (
    <div className="h-[45vh] overflow-y-auto">
      <JsonViewer obj={docs ?? {}} />
    </div>
  );
};

export default DocsViewer;
