import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import { PropsWithChildren } from 'react';

export const Root = ({
  className,
  children,
  ...restProps
}: PropsWithChildren<Tabs.TabsProps>) => (
  <Tabs.Root
    className={cn('flex flex-col shadow-2xl w-full', className)}
    {...restProps}
  >
    {children}
  </Tabs.Root>
);

export const List = ({
  className,
  children,
  ...restProps
}: PropsWithChildren<Tabs.TabsListProps>) => (
  <Tabs.List className={cn('shrink-0 flex ', className)} {...restProps}>
    {children}
  </Tabs.List>
);

export const Trigger = ({
  className,
  children,
  ...restProps
}: PropsWithChildren<Tabs.TabsTriggerProps>) => (
  <Tabs.Trigger
    className={cn(
      'px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black dark:text-slate-100 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:font-bold data-[state=active]:relative data-[state=active]:shadow-[0_0_0_2px] data-[state=active]:shadow-black data-[state=active]:dark:shadow-white  outline-none cursor-default',
      className
    )}
    {...restProps}
  >
    {children}
  </Tabs.Trigger>
);

export const Content = ({
  className,
  children,
  ...restProps
}: PropsWithChildren<Tabs.TabsContentProps>) => (
  <Tabs.Content
    className={cn(
      'grow rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-white',
      className
    )}
    {...restProps}
  >
    {children}
  </Tabs.Content>
);
