import { EditorAndDocs } from './editorAndDocs';
import { HeadersAndVars } from './headersAndVars';

export const Editor = () => {
  return (
    <div className="flex flex-col flex-grow">
      <EditorAndDocs />
      <HeadersAndVars />
    </div>
  );
};
