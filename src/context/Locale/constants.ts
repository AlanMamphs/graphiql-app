import enStrings from '../../locales/en.json';
import ruStrings from '../../locales/ru.json';

export type RegionKey = keyof typeof REGIONS;

export const REGIONS = {
  EN: 'EN',
  RU: 'RU',
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: enStrings,
  [REGIONS.RU]: ruStrings,
};
