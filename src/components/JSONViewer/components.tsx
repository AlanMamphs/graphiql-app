'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { JsonViewer } from '.';
import { CloseButton, OpenButton } from './ExpandButtons/Buttons';

const afterContent = "after:content-[','] after:text-neutral-100";

const valueTypeToClassNameMap: { [k: string]: string } = {
  string: cn('select-none text-string', afterContent),
  number: cn('select-none text-number', afterContent),
  boolean: cn('select-none text-boolean', afterContent),
  null: cn('select-none text-neutral-100', afterContent),
  undefined: '',
};

const getClassNameByValueType = (value: unknown) => {
  if (value === null) {
    return valueTypeToClassNameMap['null'];
  }

  const key = typeof value;
  return valueTypeToClassNameMap[key];
};

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
      <div className="text-key">&quot;{keyString}&quot;:</div>
      <div className={getClassNameByValueType(value)}>
        {typeof value === 'string' ? `"${value}"` : String(value)}
      </div>
    </div>
  );
};

export const BlockView = ({ keyString, value }: BlockProps) => {
  const [isExpanded, setExpanded] = useState(true);

  const rootClassName = cn(
    isExpanded ? 'flex-col gap-1' : 'flex-row',
    'flex items-start'
  );

  const nestedClassName = cn(
    isExpanded ? 'block' : 'hidden',
    'pl-5',
    'border-l'
  );

  return (
    <div className={rootClassName}>
      <div className="flex gap-2 items-center">
        <div className="text-key">&quot;{keyString}&quot;:</div>
        <p>{Array.isArray(value) ? '[' : '{'}</p>
        <OpenButton
          isExpanded={isExpanded}
          onClick={() => setExpanded(false)}
        />
      </div>
      <div className={getClassNameByValueType(value)}>
        {isExpanded && (
          <div className={nestedClassName}>
            <JsonViewer obj={value as Record<string, unknown>} />
          </div>
        )}

        {!isExpanded && <p>...</p>}
      </div>
      <div className="flex items-center">
        <p className={cn(afterContent)}>{Array.isArray(value) ? ']' : '}'}</p>
        <CloseButton
          isExpanded={!isExpanded}
          onClick={() => setExpanded(true)}
        />
      </div>
    </div>
  );
};
