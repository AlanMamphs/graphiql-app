import {
  ArrayComponent,
  BooleanComponent,
  NumberComponent,
  ObjectComponent,
  StringComponent,
} from './components';

export const getJsonNodes = (
  obj: Record<string, unknown>,
  offset: number = 0
) => {
  const arr = [];

  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      arr.push(
        <StringComponent keyString={key} value={value} offset={offset} />
      );
    }

    if (typeof value === 'number') {
      arr.push(
        <NumberComponent keyString={key} value={value} offset={offset} />
      );
    }

    if (typeof value === 'boolean') {
      arr.push(
        <BooleanComponent keyString={key} value={value} offset={offset} />
      );
    }

    if (!Array.isArray(value) && typeof value === 'object') {
      arr.push(
        <ObjectComponent
          keyString={key}
          value={value as Record<string, unknown>}
          offset={offset}
        />
      );
    }

    if (Array.isArray(value)) {
      arr.push(
        <ArrayComponent keyString={key} value={value} offset={offset} />
      );
    }
  }

  return arr;
};
