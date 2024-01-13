'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LOCALE_STRINGS, REGIONS, RegionKey } from './constants';
import { LocalizedStrings } from './localetypes';

export interface LocaleState {
  region: RegionKey | null;
  strings: LocalizedStrings;
}
interface LocaleContextValue {
  state: LocaleState;
  handleRegionChange: (region: RegionKey) => void;
}

const initialState: LocaleState = {
  region: null,
  strings: LOCALE_STRINGS[REGIONS.EN],
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

// I picked every effect from rootLayout, because those hooks has nothing to do with rootLayout.

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(initialState);

  const handleRegionChange = (region: RegionKey) => {
    setState({ region, strings: LOCALE_STRINGS[region] });

    localStorage.setItem('region', region);
  };

  useEffect(() => {
    const savedRegion = localStorage.getItem('region') as RegionKey | null;

    if (!savedRegion) {
      // if there  is no region, then this is first render and English set as default.
      setState({ ...initialState, region: REGIONS.EN as RegionKey });
    }

    if (!!savedRegion) {
      // otherwise it's set to provider and saved to localStorage.

      handleRegionChange(savedRegion);
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ state, handleRegionChange }}>
      {!!state.region ? children : null}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextValue => {
  const contextValue = useContext(LocaleContext);

  if (!contextValue) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return contextValue;
};
