import { ReactNode, memo } from 'react';
import { getJsonNodes } from './lib';

interface KeyProps {
  keyString: string;
  value: string;
}

export const KeyWrapper = memo(
  ({ keyString, children }: { keyString: string; children: ReactNode }) => (
    <span>
      <span className="text-key">&quot;{keyString}&quot;</span>: {children}
    </span>
  )
);

KeyWrapper.displayName = 'KeyWrapper';

export const StringComponent = ({ keyString, value }: KeyProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-string">
      &quot;{value.replace('\n', '').replace('\r', '')}&quot;
    </span>
    , <br />
  </KeyWrapper>
);

interface NumberProps {
  keyString: string;
  value: number;
}

export const NumberComponent = ({ keyString, value }: NumberProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-number">{value}</span>, <br />
  </KeyWrapper>
);

interface BooleanProps {
  keyString: string;
  value: boolean;
}

export const BooleanComponent = ({ keyString, value }: BooleanProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-boolean">{String(value)}</span>, <br />
  </KeyWrapper>
);

interface ObjectProps {
  keyString: string;
  value: Record<string, unknown>;
}

export const ObjectComponent = ({ keyString, value }: ObjectProps) => {
  return (
    <KeyWrapper keyString={keyString}>
      <span className="text-special">{`{`}</span> <br />
      <div className="pl-5">{getJsonNodes(value)}</div>
      <span className="text-special">{`}`}</span>, <br />
    </KeyWrapper>
  );
};

interface ArrayProps {
  keyString: string;
  value: object | null;
}

export const ArrayComponent = ({ keyString, value }: ArrayProps) => (
  <KeyWrapper keyString={keyString}>
    <span className="text-special">{`[`}</span> <br />
    <div className="pl-5">{getJsonNodes(value as Record<string, unknown>)}</div>
    <span className="text-special">{`]`}</span>, <br />
  </KeyWrapper>
);
