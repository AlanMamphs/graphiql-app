import { useStages } from '@/hooks/useStages';
import { DarkThemeToggle, Navbar } from 'flowbite-react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { navBarVariants } from './lib/variants';
import { Brand } from './ui/Brand';
import { Links } from './ui/Links';

export const NavbarComponent = () => {
  const { stage, onOpen, onClose } = useStages('open');
  const lastPosition = useMotionValue(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const pos = lastPosition.get();

    pos < latest ? onClose() : onOpen();

    lastPosition.set(latest);
  });

  return (
    <motion.header
      className="sticky top-0 z-10"
      variants={navBarVariants}
      animate={stage}
    >
      <Navbar fluid rounded>
        <Brand />

        <Navbar.Collapse>
          <Links />

          <li>
            <DarkThemeToggle data-testid="nav-light-dark-theme" />
          </li>
        </Navbar.Collapse>
      </Navbar>
    </motion.header>
  );
};
