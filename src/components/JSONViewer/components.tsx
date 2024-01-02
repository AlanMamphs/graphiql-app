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

interface BlockProps {
  keyString: string;
  value: Record<string, unknown>;
}

interface InlineProps {
  keyString: string;
  value: string | number | null;
}

export const InlineView = ({ keyString, value }: InlineProps) => (
  <div className="flex gap-2 items-start">
    <Key text={keyString} />
    <div className={getClassNameByValueType(value)}>
      {typeof value === 'string' ? `"${value}"` : String(value)}
    </div>
  </div>
);

export const BlockView = ({ keyString, value }: BlockProps) => (
  <div className="flex flex-col gap-1 items-start">
    <div className="flex gap-2">
      <Key text={keyString} />
      <p>{Array.isArray(value) ? '[' : '{'}</p>
    </div>
    <div className={getClassNameByValueType(value)}>
      <div className="pl-5">
        <JsonViewer obj={value as Record<string, unknown>} />
      </div>
    </div>
    <div className="flex">
      <p className="text-start">{Array.isArray(value) ? ']' : '}'}</p>
      {','}
    </div>
  </div>
);
