import {
  verticalPrimaryVariants,
  verticalSecondaryVariants,
} from '@/components/Navbar/lib/verticalSwap';
import { m } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
interface Props {
  stage: 'open' | 'closed';
  onClick?: () => void;
}

export const MenuButton = ({ stage = 'open', onClick }: Props) => {
  return (
    <m.div
      className="absolute top-3 right-4 font-bold h-10 text-center px-3 py-2 z-20 border rounded dark:border-gray-700 dark:bg-gray-800"
      animate={stage}
      onClick={onClick}
    >
      <m.p variants={verticalPrimaryVariants} animate={stage}>
        <MenuIcon data-testid="nav-menu-hamburger" />
      </m.p>
      <m.p
        initial={{ opacity: 0 }}
        variants={verticalSecondaryVariants}
        animate={stage}
      >
        <X data-testid="nav-menu-close" />
      </m.p>
    </m.div>
  );
};
