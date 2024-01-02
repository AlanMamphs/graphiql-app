import { ChevronDown, ChevronUp } from 'lucide-react';

const className = 'cursor-pointer p-1 opacity-50';

export const OpenButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) =>
  isExpanded && (
    <p className={className} onClick={onClick}>
      <ChevronUp className="w-4 h-4" />
    </p>
  );

export const CloseButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) =>
  isExpanded && (
    <p className={className} onClick={onClick}>
      <ChevronDown className="w-4 h-4" />
    </p>
  );
