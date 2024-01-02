import { BlockView, InlineView } from './components';

export const JsonViewer = ({ obj }: { obj: Record<string, unknown> }) => {
  const jsx = obj
    ? Object.entries(obj).map(([key, value]) => {
        if (value !== null && typeof value === 'object') {
          return (
            <BlockView
              key={key}
              keyString={key}
              value={value as Record<string, unknown>}
            />
          );
        } else {
          return (
            <InlineView
              key={key}
              keyString={key}
              value={value as string | number | null}
            />
          );
        }
      })
    : [];

  return <div className="root">{jsx}</div>;
};
