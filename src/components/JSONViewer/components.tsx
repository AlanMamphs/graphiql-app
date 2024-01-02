import { cn } from '@/lib/utils';
import { JsonViewer } from '.';

const afterContent = "after:content-[','] after:text-neutral-100";

const valueTypeToClassNameMap: { [k: string]: string } = {
  string: cn('text-string', afterContent),
  number: cn('text-number', afterContent),
  boolean: cn('text-boolean', afterContent),
  null: cn('text-neutral-100', afterContent),
  undefined: '',
};

const getClassNameByValueType = (value: unknown) => {
  if (value === null) {
    return valueTypeToClassNameMap['null'];
  }

  const key = typeof value;
  return valueTypeToClassNameMap[key];
};

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

export const InlineView = ({ keyString, value }: InlineProps) => {
  return (
    <div className="flex gap-2 items-start">
      <Key text={keyString} />
      <div className={getClassNameByValueType(value)}>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </div>
    </div>
  );
};

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
      <p className={cn(afterContent)}>{Array.isArray(value) ? ']' : '}'}</p>
    </div>
  </div>
);
