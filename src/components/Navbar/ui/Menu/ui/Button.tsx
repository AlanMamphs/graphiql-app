import {
  verticalPrimaryVariants,
  verticalSecondaryVariants,
} from '@/components/Navbar/lib/verticalSwap';
import { motion } from 'framer-motion';

export const MenuButton = ({
  stage = 'open',
  onClick,
}: {
  stage: 'open' | 'closed';
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className="absolute top-1 right-2 font-bold h-10 text-center px-3 py-1 z-20 border rounded dark:border-gray-700 dark:bg-gray-800"
      animate={stage}
      onClick={onClick}
    >
      <motion.p variants={verticalPrimaryVariants} animate={stage}>
        Menu
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        variants={verticalSecondaryVariants}
        animate={stage}
      >
        Close
      </motion.p>
    </motion.div>
  );
};
