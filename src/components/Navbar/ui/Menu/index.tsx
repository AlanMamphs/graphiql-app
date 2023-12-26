import { useStages } from '@/hooks/useStages';
import { m } from 'framer-motion';
import { MenuButton } from './ui/Button';
import { MenuContent } from './ui/Content';

export const Menu = () => {
  const { stage, onOpen, onClose } = useStages('closed');

  const handleFlag = stage === 'closed' ? onOpen : onClose;

  return (
    <m.div className="cursor-pointer" data-testid="nav-secondary-menu-btn">
      <MenuButton onClick={handleFlag} stage={stage} />
      <MenuContent onClick={onClose} stage={stage} />
    </m.div>
  );
};
