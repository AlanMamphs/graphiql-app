import { JsonViewer } from '.';

const valueTypeToClassNameMap: { [k: string]: string } = {
  string: 'text-string',
  number: 'text-number',
  boolean: 'text-boolean',
  undefined: '',
};

const getClassNameByValueType = (value: unknown) =>
  valueTypeToClassNameMap[typeof value] ?? valueTypeToClassNameMap['undefined'];

const Key = ({ text }: { text: string }) => (
  <div className="text-key">&quot;{text}&quot;:</div>
);

interface ViewProps {
  keyString: string;
  value: string | Record<string, unknown>;
}

export const InlineView = ({ keyString, value }: ViewProps) => (
  <div className="flex gap-2 items-start">
    <Key text={keyString} />
    <div className={getClassNameByValueType(value)}>
      {typeof value === 'string' ? `"${value}"` : String(value)}
    </div>
  </div>
);

export const BlockView = ({ keyString, value }: ViewProps) => (
  <div className="flex flex-col gap-1 items-start">
    <div className="flex gap-2">
      <Key text={keyString} />
      <p>{Array.isArray(value) ? '[' : '{'}</p>
    </div>
    <div className={getClassNameByValueType(value)}>
      <div className="pl-5">
        <JsonViewer obj={value as Record<string, unknown>} />
      </div>
      <p>{Array.isArray(value) ? '],' : '},'}</p>
    </div>
  </div>
);
