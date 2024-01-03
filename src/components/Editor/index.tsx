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
  const [text, setText] = useState<string>('');
  const [children, setChildren] = useState<string | null>(null);

  useEffect(() => {
    const prettifyRow = (label: string) => {
      if (label.length > 80) {
        setText(label + '\n');
      }

      setText(label);
    };

    if (value.includes('\n')) {
      const arr = value.split('\n');

      prettifyRow(arr[0]);
      setChildren(arr.slice(1).join('\n'));
    } else {
      prettifyRow(value);
    }
  }, [value]);

  const formattedHeader = getFormattedJSXes(text);

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

export const Editor = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
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
      <pre className="absolute inset-0 text-blue w-full h-full">
        <HighlightedText key={text} value={text || ''} />
      </pre>
      <textarea
        ref={ref}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="absolute w-full h-full mb-auto overflow-auto outline-none bg-transparent text-transparent caret-slate-100"
      />
    </div>
  );
};
