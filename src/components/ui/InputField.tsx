import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Label } from './label';
import { Input, InputProps } from './input';

interface ControlProps extends InputProps {
  label?: string;
  error?: string;
  inputClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, ControlProps>(
  ({ className, error, label, inputClassName, ...inputProps }, ref) => {
    return (
      <div className={cn('mb-6', className)}>
        {label && (
          <Label
            htmlFor={inputProps.id}
            className={error && 'text-red-700 dark:text-red-500'}
          >
            {label}
          </Label>
        )}
        <Input
          {...inputProps}
          className={cn(
            !!error &&
              'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500  dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
            inputClassName
          )}
          ref={ref}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
