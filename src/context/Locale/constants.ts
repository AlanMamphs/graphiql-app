import enStrings from '../../locales/en.json';
import ruStrings from '../../locales/ru.json';

export const REGIONS = {
  UNSET: 'UNSET',
  EN: 'EN',
  RU: 'RU',
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: enStrings,
  [REGIONS.RU]: ruStrings,
};
