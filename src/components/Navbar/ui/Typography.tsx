import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Typography = ({ children, className }: Props) => (
  <p className={className}>{children}</p>
);
