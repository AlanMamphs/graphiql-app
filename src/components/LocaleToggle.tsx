'use client';

import { useLocale } from '@/context/Locale';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleToggle() {
  const {
    state: { region },
    handleRegionChange,
  } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="localization-dropdown">
        <Button variant="outline" size="icon" className="mx-1">
          {region}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        data-testid="localization-dropdown-links"
      >
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="localization-dropdown-en"
          onClick={() => handleRegionChange('EN')}
        >
          EN
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="localization-dropdown-ru"
          onClick={() => handleRegionChange('RU')}
        >
          RU
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
