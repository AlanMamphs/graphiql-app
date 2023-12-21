import { motion } from 'framer-motion';
import { Links } from '../../Links';
import { DURATION_TIME } from '@/components/Navbar/lib/variants';

const variants = {
  closed: {
    opacity: 0,
    width: 0,
    transition: {
      duration: DURATION_TIME * 0.001,
    },
  },
  open: {
    opacity: 1,
    width: '11rem',
    transition: {
      duration: DURATION_TIME * 0.001,
    },
  },
};

export const MenuContent = ({
  stage,
  onClick,
}: {
  stage: 'open' | 'closed';
  onClick?: () => void;
}) => {
  return (
    <motion.div
      animate={stage}
      onClick={onClick}
      variants={variants}
      data-testid="nav-secondary-menu-links"
      className="absolute top-0 right-0 py-10 pl-4 items-center rounded-md bg-slate-700"
    >
      {stage === 'open' && <Links className="gap-1" direction="col" />}
    </motion.div>
  );
};
