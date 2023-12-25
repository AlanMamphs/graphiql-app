import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDrawnNodesFromObject = (
  obj: Record<string, unknown>,
  offset: number = 0
) => {
  const stringsArr: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const offsetStr = ' '.repeat(offset);

    if (typeof value === 'string') {
      const tempKey = `${offsetStr}<span class="text-amber-300">"${key}"</span>`;
      const data = value.replace('\n', '').replace('\r', '');
      const tempValue = `<span class="text-green-300">"${data}"</span>`;

      stringsArr.push(`${tempKey}: ${tempValue}, \n`);
    }

    if (typeof value === 'number') {
      const tempKey = `${offsetStr}<span class="text-amber-300">"${key}"</span>`;
      const tempValue = `<span class="text-blue-300">${value}</span>`;

      stringsArr.push(`${tempKey}: ${tempValue}, \n`);
    }

    if (typeof value === 'boolean') {
      const tempKey = `${offsetStr}<span class="text-amber-300">"${key}"</span>`;

      const tempValue = `<span class="text-zinq-400">${value}</span>`;

      stringsArr.push(`${tempKey}: ${tempValue}, \n`);
    }

    if (Array.isArray(value)) {
      const tempKey = `${offsetStr}<span class="text-amber-300">"${key}"</span>`;
      const arr = getDrawnNodesFromObject({ ...value }, offset + 2);
      const newOff = ' '.repeat(offset);

      stringsArr.push(
        `${tempKey}: <span class="text-yellow-600">[</span> \n`,
        ...arr,
        `${newOff}<span class="text-yellow-600">]</span>, \n`
      );
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const tempKey = `${offsetStr}<span class="text-amber-300">"${key}"</span>`;
      const arr = getDrawnNodesFromObject({ ...value }, offset + 2);
      const newOff = ' '.repeat(offset);

      stringsArr.push(
        `${tempKey}: <span class="text-yellow-600">{</span> \n`,
        ...arr,
        `${newOff}<span class="text-yellow-600">}</span>, \n`
      );
    }
  }

  return stringsArr;
};
