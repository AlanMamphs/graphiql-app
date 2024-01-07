import { EditorAndDocs } from './editorAndDocs';
import { HeadersAndVars } from './headersAndVars';
import { ToastError } from './toastError';

export const Editor = () => {
  return (
    <div className="flex flex-col flex-grow">
      <EditorAndDocs />
      <HeadersAndVars />
      <ToastError />
    </div>
  );
};
