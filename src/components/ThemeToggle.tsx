import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const handleTheme = () => (isLight ? setTheme('dark') : setTheme('light'));

  return (
    <Button variant="outline" size="icon" onClick={handleTheme}>
      {isLight ? <Moon /> : <Sun />}
    </Button>
  );
}
