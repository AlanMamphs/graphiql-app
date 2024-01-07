import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { useGQLContext } from '../context';
import { X } from 'lucide-react';

export const ToastError = () => {
  const { resultsError, errorToastOpen, setErrorToastOpen } = useGQLContext();
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="bg-slate-50 dark:bg-slate-700 dark:text-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={errorToastOpen}
        onOpenChange={setErrorToastOpen}
        data-testid="playground-error-toast"
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          GraphiQL error
        </Toast.Title>
        <Toast.Description asChild>
          <>{resultsError}</>
        </Toast.Description>
        <Toast.Action className="[grid-area:_action]" asChild altText="Close">
          <X className=" cursor-pointer " />
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastError;
