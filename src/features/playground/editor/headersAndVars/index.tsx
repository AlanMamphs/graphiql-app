import * as Tabs from '@/components/ui/tabs';
import { HeaderEditor } from './headersEditor';
import { VarsEditor } from './varsEditor';

export const HeadersAndVars = () => (
  <Tabs.Root defaultValue="headers" className="my-5">
    <Tabs.List aria-label="GraphQL Headers">
      <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
      <Tabs.Trigger value="variables">Variables</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="headers">
      <HeaderEditor />
    </Tabs.Content>
    <Tabs.Content value="variables">
      <VarsEditor />
    </Tabs.Content>
  </Tabs.Root>
);
