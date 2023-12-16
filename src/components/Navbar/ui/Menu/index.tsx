import { useStages } from '@/hooks/useStages';
import { motion } from 'framer-motion';
import { MenuButton } from './ui/Button';
import { MenuContent } from './ui/Content';

const menuVariants = {
  visible: { display: 'flex', transition: { duration: 0 } },
  invisible: { display: 'none', transition: { duration: 0 } },
};

export const Menu = () => {
  const { stage, onOpen, onClose } = useStages('closed');
  const handleMenuClick = () => (stage === 'open' ? onClose() : onOpen());

  return (
    <motion.div
      variants={menuVariants}
      animate={stage}
      onClick={handleMenuClick}
      className="relative cursor-pointer px-4 py-2 dark:border-gray-700 dark:bg-gray-800 rounded-xl text-white"
      data-testid="nav-secondary-menu-btn"
    >
      <MenuButton stage={stage} />
      <MenuContent stage={stage} />
    </motion.div>
  );
};
