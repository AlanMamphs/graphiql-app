import { BlockView, InlineView } from './components';

export const JsonViewer = <T extends object>({ obj }: { obj: T }) => {
  return (
    <div className="root">
      {Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object' && value !== undefined) {
          return <BlockView keyString={key} value={value} />;
        }

        if (typeof value !== 'object' && value) {
          return <InlineView keyString={key} value={value} />;
        }
      })}
    </div>
  );
};
