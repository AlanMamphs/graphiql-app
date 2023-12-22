import {
  verticalPrimaryVariants,
  verticalSecondaryVariants,
} from '@/components/Navbar/lib/verticalSwap';
import { m } from 'framer-motion';

export const MenuButton = ({
  stage = 'open',
  onClick,
}: {
  stage: 'open' | 'closed';
  onClick?: () => void;
}) => {
  return (
    <m.div
      className="absolute top-1 right-2 font-bold h-10 text-center px-3 py-1 z-20 border rounded dark:border-gray-700 dark:bg-gray-800"
      animate={stage}
      onClick={onClick}
    >
      <m.p variants={verticalPrimaryVariants} animate={stage}>
        Menu
      </m.p>
      <m.p
        initial={{ opacity: 0 }}
        variants={verticalSecondaryVariants}
        animate={stage}
      >
        Close
      </m.p>
    </m.div>
  );
};
