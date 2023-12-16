import {
  verticalPrimaryVariants,
  verticalSecondaryVariants,
} from '@/components/Navbar/lib/verticalSwap';
import { motion } from 'framer-motion';

export const MenuButton = ({ stage }: { stage: 'open' | 'closed' }) => (
  <motion.div
    className="flex flex-col font-bold overflow-hidden h-6 text-center z-10"
    animate={stage}
  >
    <motion.p variants={verticalPrimaryVariants} animate={stage}>
      Close
    </motion.p>
    <motion.p variants={verticalSecondaryVariants} animate={stage}>
      Menu
    </motion.p>
  </motion.div>
);
