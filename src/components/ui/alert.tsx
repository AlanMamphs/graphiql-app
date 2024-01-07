import * as React from 'react';
import { cn } from '@/lib/utils';

const DangerAlert = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={cn(
      'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400',
      className
    )}
    role="alert"
    {...props}
  >
    {children}
  </div>
);
export { DangerAlert };
