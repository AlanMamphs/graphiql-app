'use client';

import * as React from 'react';
import { useLocale, Action } from '@/context/Locale';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleToggle() {
  const { state, dispatch } = useLocale();

  const handleRegionChange = (region: string) => {
    const action: Action = {
      type: 'CHANGE_LOCALE',
      payload: {
        region: region,
      },
    };
    dispatch(action);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="locale-dropdown">
        <Button variant="outline" size="icon">
          {state.region}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-testid="locale-dropdown-links">
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="locale-dropdown-links-EN"
          onClick={() => handleRegionChange('EN')}
        >
          EN
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="locale-dropdown-links-RU"
          onClick={() => handleRegionChange('RU')}
        >
          RU
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
