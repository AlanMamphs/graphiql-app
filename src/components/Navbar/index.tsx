import { useStages } from '@/hooks/useStages';
import { cn } from '@/lib/utils';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';
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
    <m.header className="sticky flex justify-between top-0 px-3 py-3 z-10">
      <Brand />
      <m.div
        className={cn('absolute inset-0 -z-10 border-b bg-card')}
        data-testid="nav-background"
        animate={stage}
        variants={{
          open: {
            opacity: 0,
          },
          closed: {
            opacity: 0.9,
          },
        }}
      />
      <Links className="gap-3" />
    </m.header>
  );
};
