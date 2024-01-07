import * as Tabs from '@/components/ui/tabs';
import { HeaderEditor } from './headersEditor';
import { VarsEditor } from './varsEditor';
import { useLocale } from '@/context/Locale';

export const HeadersAndVars = () => {
  const {
    state: {
      strings: { main },
    },
  } = useLocale();

  return (
    <Tabs.Root defaultValue="headers" className="my-5">
      <Tabs.List aria-label="GraphQL Headers">
        <Tabs.Trigger value="headers">{main.headers}</Tabs.Trigger>
        <Tabs.Trigger value="variables">{main.variables}</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="headers">
        <HeaderEditor />
      </Tabs.Content>
      <Tabs.Content value="variables">
        <VarsEditor />
      </Tabs.Content>
    </Tabs.Root>
  );
};
