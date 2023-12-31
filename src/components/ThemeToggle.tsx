'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { useLocale } from '@/context/Locale';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ModeToggle = () => {
  const { setTheme } = useTheme();
  const {
    state: {
      strings: { themetoggle: text },
    },
  } = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="theme-dropdown">
        <Button variant="outline" size="icon" className="mx-1">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-testid="theme-dropdown-links">
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="theme-dropdown-links-light"
          onClick={() => setTheme('light')}
        >
          {text.light}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="theme-dropdown-links-dark"
          onClick={() => setTheme('dark')}
        >
          {text.dark}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          data-testid="theme-dropdown-links-system"
          onClick={() => setTheme('system')}
        >
          {text.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
