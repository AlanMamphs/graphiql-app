import { ChangeEvent, useRef, useState } from 'react';

export const QueryPrettified = ({
  text,
  paddedText,
}: {
  text: string;
  paddedText: string;
}) => {
  return (
    <div>
      <div className="flex gap-2 items-center">{text}</div>
      <div className="pl-2 empty:hidden">
        <QueryPrettified text={text} paddedText={paddedText} />
      </div>
    </div>
  );
};

const getItems = (text: string) => {
  const index = text.indexOf('\n');
  const textWithFirstNewLine = text
    .substring(0, index)
    .concat(' ')
    .concat(text.substring(index + 1));
  const arr = textWithFirstNewLine.split('\n');

  return {
    header: arr[0],
    children: arr[1],
  };
};

const HighlightedText = ({
  value,
  nesting,
}: {
  value: string;
  nesting: number;
}) => {
  const [children, setChildren] = useState<string>('');

  const formattedHeader = value.split(' ').map((item, index) => {
    const systemWords = ['include', 'type', 'const', 'asd'];

    if (systemWords.includes(item)) {
      return (
        <span key={item + index + nesting} className="text-red-400">
          {item}{' '}
        </span>
      );
    }

    const specialChars = ['{', '[', ']', '}', ',', '.', ':', ';'];

    if (specialChars.includes(item)) {
      return (
        <span key={item + index + nesting} className="text-neutral-100">
          {item}{' '}
        </span>
      );
    }

    return (
      <span key={item + index + nesting} className="text-blue-100">
        {item}{' '}
      </span>
    );
  });

  if (value.includes('\n')) {
    setChildren(value.split('\n').slice(1).join(''));
  }

  return (
    <div className="flex flex-col">
      <div>{formattedHeader}</div>
      <div className={`pl-${nesting + 2}`}>
        <HighlightedText value={children} nesting={nesting} />
      </div>
    </div>
  );
};

export const Editor = () => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    setText(event.target.value);
  };

  return (
    <div className="relative w-full h-full">
      <pre className="absolute inset-0 w-full h-full text-left">
        <HighlightedText value={text} nesting={0} />
      </pre>
      <textarea
        ref={ref}
        onChange={handleChange}
        className="absolute text-blue w-full h-full outline-none inset-0 bg-transparent text-transparent caret-slate-100"
      />
    </div>
  );
};
