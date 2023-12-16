import { useStages } from '@/hooks/useStages';
import { DarkThemeToggle, Navbar } from 'flowbite-react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import Image from 'next/image';
import {
  verticalPrimaryVariants,
  verticalSecondaryVariants,
} from './lib/verticalSwap';
import { Brand } from './ui/Brand';
import { Links } from './ui/Links';
import { Menu } from './ui/Menu';

const HEADER_HEIGHT = 60;

export const NavbarComponent = () => {
  const { stage, onOpen, onClose } = useStages('open');
  const lastPosition = useMotionValue(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    latest > HEADER_HEIGHT ? onClose() : onOpen();

    lastPosition.set(latest);
  });

  return (
    <motion.header
      className="sticky top-0 z-10 flex flex-col h-16"
      animate={stage}
    >
      <motion.div variants={verticalPrimaryVariants} animate={stage}>
        <Navbar fluid rounded>
          <Brand />

          <Navbar.Collapse>
            <Links />

            <li>
              <DarkThemeToggle data-testid="nav-light-dark-theme" />
            </li>
          </Navbar.Collapse>
        </Navbar>
      </motion.div>
      <motion.div
        data-testid="nav-secondary-menu"
        className="px-2 py-2.5 sm:px-4 rounded"
        initial={{ opacity: 0 }}
        variants={verticalSecondaryVariants}
        animate={stage}
      >
        <div className="flex justify-between">
          <motion.div className="w-10 aspect-square relative">
            <Image alt="Logo" src="/favicon.png" fill />
          </motion.div>
          <Menu />
        </div>
      </motion.div>
    </motion.header>
  );
};
