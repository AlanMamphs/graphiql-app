import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { EyeOff, Eye } from 'lucide-react';

import { EditorAndDocs } from './editorAndDocs';
import { HeadersAndVars } from './headersAndVars';
import { ToastError } from './toastError';
import { ActionsBar } from './actionsBar';
import { Button } from '@/components/ui/button';

export const Editor = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col flex-grow">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <ActionsBar>
          <Collapsible.Trigger asChild>
            {open ? (
              <Button
                data-testid="playground-hide-h-and-v"
                className="mx-3"
                variant="outline"
                title="Hide headers and variables"
              >
                <EyeOff />
              </Button>
            ) : (
              <Button
                data-testid="playground-show-h-and-v"
                className="mx-3"
                variant="outline"
                title="Show headers and variables"
              >
                <Eye />
              </Button>
            )}
          </Collapsible.Trigger>
        </ActionsBar>

        <EditorAndDocs isHeadersAndVarsVisible={open} />

        <Collapsible.Content>
          <HeadersAndVars />
        </Collapsible.Content>
      </Collapsible.Root>

      <ToastError />
    </div>
  );
};
