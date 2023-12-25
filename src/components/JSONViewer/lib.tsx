import { ReactNode } from 'react';
import {
  ArrayComponent,
  BooleanComponent,
  NumberComponent,
  ObjectComponent,
  StringComponent,
} from './components';

export const getJsonNodes = (obj: Record<string, unknown>) => {
  const arr: ReactNode[] = [];

  const p = (item: ReactNode) => arr.push(item);

  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      p(<StringComponent keyString={key} value={value} />);
    }

    if (typeof value === 'number') {
      p(<NumberComponent keyString={key} value={value} />);
    }

    if (typeof value === 'boolean') {
      p(<BooleanComponent keyString={key} value={value} />);
    }

    if (!Array.isArray(value) && typeof value === 'object') {
      p(<ObjectComponent keyString={key} value={value as typeof obj} />);
    }

    if (Array.isArray(value)) {
      p(<ArrayComponent keyString={key} value={value} />);
    }
  }

  return arr;
};
