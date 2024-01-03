import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

const getFormattedJSXes = (text: string) => {
  const arr = text.split(' ').map((item, index) => {
    const specialChars = ['{', '[', ']', '}', ',', '.', ':', ';'];

    if (specialChars.includes(item)) {
      return (
        <span key={item + index} className="text-neutral-100">
          {item}{' '}
        </span>
      );
    }

    return (
      <span key={item + index} className="text-number">
        {item}{' '}
      </span>
    );
  });

  return arr;
};

const HighlightedText = ({ value }: { value: string }) => {
  // Here I am defining 2 state for current line rendering, and rendering recursively next lines
  const [text, setText] = useState<string>('');
  const [children, setChildren] = useState<string | null>(null);

  useEffect(() => {
    if (value.includes('\n')) {
      const arr = value.split('\n');

      // I am getting the first line to be printed in current iteration.
      setText(arr[0]);

      // I am getting the rest of text, that will be reprinted recursively
      setChildren(arr.slice(1).join('\n'));
    } else {
      setText(value);
    }
  }, [value]);

  /* I am getting formatted JSX array, that contains each word wrapped in colored
  span. (Right now its a rudimentary, because I thought, that we must highlight
  all syntax features from GraphQL, but looks like it was overhead) */

  const formattedHeader = getFormattedJSXes(text);

  /* Repeat the whole process for rest of the text, that was set to new line*/
  return (
    <>
      {formattedHeader}
      {children && (
        <>
          <br />
          <HighlightedText value={children} />
        </>
      )}
    </>
  );
};

interface Props {
  onQueryChange: (text: string) => void;
}

export const Editor = ({ onQueryChange }: Props) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // This state is being used by output box, updating by changes in textarea input.
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onQueryChange(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // I am listening for each key press to catch specific buttons, don't know why.
    if (ref.current) {
      // On enter I am getting the current cursor position and inserting new line with tab
      if (event.key === 'Enter') {
        event.preventDefault();
        const posStart = event.currentTarget.selectionStart;
        const start = event.currentTarget.value.slice(0, posStart);
        const rest = event.currentTarget.value.slice(posStart);

        setText(start + '\n    ' + rest);

        ref.current.value = start + '\n    ' + rest;

        ref.current.selectionStart = posStart + 5;
        ref.current.selectionEnd = posStart + 5;
      }

      // Basically the same as enter, but inserting the tab without new line;
      if (event.key === 'Tab') {
        event.preventDefault();
        const posStart = event.currentTarget.selectionStart;
        const start = event.currentTarget.value.slice(0, posStart);
        const rest = event.currentTarget.value.slice(posStart);

        setText(start + '    ' + rest);

        ref.current.value = start + '    ' + rest;
        ref.current.selectionStart = posStart + 4;
        ref.current.selectionEnd = posStart + 4;
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      <pre
        data-testid="editor-output"
        className="absolute inset-0 text-blue w-full h-full"
      >
        <HighlightedText key={text} value={text || ''} />
      </pre>
      <textarea
        data-testid="editor-input"
        ref={ref}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="absolute w-full h-full mb-auto overflow-auto outline-none bg-transparent text-transparent caret-slate-100"
      />
    </div>
  );
};
