import { motion } from 'framer-motion';
import { useState } from 'react';
import { DURATION_TIME, variants } from '../lib';
import { Typography } from './Typography';

interface Props {
  onClick?: () => void;
  dataTestId?: string;
  text: string;
}

export const NavigationButton = ({ text, dataTestId, onClick }: Props) => {
  const [stage, setStage] = useState<keyof typeof variants>('start');

  const onHoverStart = () => {
    setStage('start');

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
      className="relative flex py-2 px-3 items-center justify-center overflow-hidden"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <Typography
        text={text}
        stage={stage === 'preserved' ? 'open' : 'closed'}
      />
      <motion.span
        variants={variants}
        animate={stage}
        className="h-[1px] absolute bottom-0 bg-white w-full"
      />
    </motion.button>
  );
};
