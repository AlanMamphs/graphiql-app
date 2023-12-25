import { ReactNode, memo } from 'react';
import { getJsonNodes } from './lib';

interface KeyProps {
  keyString: string;
  value: string;
  offset: number;
}

export const KeyWrapper = memo(
  ({ keyString, children }: { keyString: string; children: ReactNode }) => (
    <span>
      <span className="text-amber-300">&quot;{keyString}&quot;</span>:{' '}
      {children}
    </span>
  )
);

KeyWrapper.displayName = 'KeyWrapper';

export const StringComponent = ({ keyString, value }: KeyProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-green-300">
      &quot;{value.replace('\n', '').replace('\r', '')}&quot;
    </span>
    , <br />
  </KeyWrapper>
);

interface NumberProps {
  keyString: string;
  value: number;
  offset: number;
}

export const NumberComponent = ({ keyString, value }: NumberProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-blue-300">{value}</span>, <br />
  </KeyWrapper>
);

interface BooleanProps {
  keyString: string;
  value: boolean;
  offset: number;
}

export const BooleanComponent = ({ keyString, value }: BooleanProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-blue-300">{String(value)}</span>, <br />
  </KeyWrapper>
);

interface ObjectProps {
  keyString: string;
  value: Record<string, unknown>;
  offset: number;
}

export const ObjectComponent = ({ keyString, value }: ObjectProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-blue-300">{`{`}</span> <br />
    <div className="pl-10">{getJsonNodes(value)}</div>
    <span className="text-blue-300">{`}`}</span>, <br />
  </KeyWrapper>
);

interface ArrayProps {
  keyString: string;
  value: object | null;
  offset: number;
}

export const ArrayComponent = ({ keyString, value }: ArrayProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-blue-300">{`[`}</span> <br />
    <div className="pl-10">
      {getJsonNodes(value as Record<string, unknown>)}
    </div>
    <span className="text-blue-300">{`]`}</span>, <br />
  </KeyWrapper>
);
