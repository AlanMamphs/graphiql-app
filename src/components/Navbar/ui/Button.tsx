import { motion } from 'framer-motion';
import { useState } from 'react';
import { Typography } from './Typography';
import { DURATION_TIME, underlineVariants } from '../lib/variants';

interface Props {
  onClick?: () => void;
  dataTestId?: string;
  text: string;
}

export const NavigationButton = ({ text, dataTestId, onClick }: Props) => {
  const [stage, setStage] = useState<keyof typeof underlineVariants>('start');

  const onHoverStart = () => {
    setStage('preserved');
  };

  const onHoverEnd = () => {
    setStage('end');

    setTimeout(() => setStage('reset'), DURATION_TIME);
  };

  return (
    <motion.button
      data-testid={dataTestId}
      onClick={onClick}
      className="relative flex py-2 items-center justify-center overflow-hidden text-white"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <Typography>{text}</Typography>
      <motion.span
        initial={{ left: '-100%' }}
        variants={underlineVariants}
        animate={stage}
        className="h-[1px] absolute bottom-0 bg-white w-full"
      />
    </motion.button>
  );
};
