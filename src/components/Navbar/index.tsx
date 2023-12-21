'use client';

import { useStages } from '@/hooks/useStages';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { DURATION_TIME } from './lib/variants';
import { Brand } from './ui/Brand';
import { Links } from './ui/Links';

const HEADER_HEIGHT = 60;

export const NavbarComponent = () => {
  const { stage, onOpen, onClose } = useStages('open');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    latest > HEADER_HEIGHT ? onClose() : onOpen();
  });

  return (
    <motion.header className="sticky flex justify-between top-0 px-1 py-2 z-10 text-white">
      <Brand stage={stage} />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-slate-700 to-slate-600 -z-10"
        data-testid="nav-background"
        animate={stage}
        variants={{
          closed: {
            height: 0,
          },
          open: {
            height: '100%',
          },
        }}
      />
      <motion.div>
        <Links className="gap-3" />
      </motion.div>
    </motion.header>
  );
};
