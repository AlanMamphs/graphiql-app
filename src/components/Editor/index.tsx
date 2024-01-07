import React, { AllHTMLAttributes } from 'react';
import dynamic from 'next/dynamic';
// @ts-expect-error type doesn't exist
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-graphql';
import 'prismjs/themes/prism.css';
import EditorContextMenu, { type EditorContextMenuItems } from './contextMenu';

const Editor = dynamic(() => import('react-simple-code-editor'), {
  ssr: false,
});
export { languages };

const hightlightWithLineNumbers = (
  input: string,
  language = languages.graphql
) =>
  (highlight(input, language) as string)
    .split('\n')
    .map(
      (line, i) =>
        `<span class='absolute p-1 font-bold text-xs -left-4 w-12 text-right dark:bg-blue-500 bg-slate-500'>${
          i + 1
        }</span>${line}`
    )
    .join('\n');

export const EditorComponent = ({
  code,
  syntaxError,
  onCodeChange,
  className,
  language,
  onBlur,
  contextMenuItems,
  ...restProps
}: {
  className?: string;
  code: string;
  syntaxError?: string;
  onCodeChange: (code: string) => void;
  onBlur: () => void;
  language?: string;
  contextMenuItems: EditorContextMenuItems;
} & AllHTMLAttributes<HTMLDivElement>) => (
  <div {...restProps}>
    {syntaxError && (
      <div className=" dark:bg-black bg-white z-10 sticky top-0 text-red-500">
        {syntaxError}
      </div>
    )}
    <EditorContextMenu items={contextMenuItems}>
      <div className={className}>
        <Editor
          value={code ?? ''}
          onValueChange={onCodeChange}
          highlight={(value) => hightlightWithLineNumbers(value, language)}
          padding={40}
          onBlur={onBlur}
          className="flex-1"
          textareaClassName=" p-l-16 dark:bg-blue-950 bg-slate-300 break-words break-all"
          tabSize={1}
          insertSpaces={false}
          ignoreTabKey={false}
        />
      </div>
    </EditorContextMenu>
  </div>
);
