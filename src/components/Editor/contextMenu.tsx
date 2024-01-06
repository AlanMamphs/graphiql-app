import React, { PropsWithChildren } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { cn } from '@/lib/utils';

const Item = ({
  children,
  className,
  ...restProps
}: PropsWithChildren<ContextMenu.ContextMenuItemProps>) => {
  return (
    <ContextMenu.Item
      className={cn(
        'group text-[13px] leading-none text-slate-900 dark:text-slate-50 rounded-[3px] flex items-center h-[25px] px-[15px] relative select-none outline-none data-[disabled]:text-slate-400  data-[disabled]:pointer-events-none  data-[highlighted]:text-slate-500 data-[highlighted]:dark:text-slate-400',
        className
      )}
      {...restProps}
    >
      {children}
    </ContextMenu.Item>
  );
};

export type EditorContextMenuItems = ({
  text: string;
  action: () => void;
} & ContextMenu.ContextMenuItemProps)[];

export const EditorContextMenu = (
  props: PropsWithChildren<{ items: EditorContextMenuItems }>
) => {
  if (!props.items?.length) {
    return <>{props.children}</>;
  }
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="flex h-full">
        {props.children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="w-full bg-white dark:bg-slate-700 rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          // @ts-expect-error invalid library type
          sideOffset={5}
          align="end"
          data-testid="playground-context-menu"
        >
          {props.items.map(({ text, action, ...itemProps }) => (
            <Item key={text} onClick={action} {...itemProps}>
              {text}{' '}
            </Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default EditorContextMenu;
