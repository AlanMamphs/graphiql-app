import { motion } from 'framer-motion';
import { NavigationButton } from '../../Button';

const variants = {
  closed: {
    opacity: 0,
    width: 0,
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    width: '15rem',
    height: '19rem',
    transition: {
      duration: 0.3,
    },
  },
};

export const MenuContent = ({ stage }: { stage: 'open' | 'closed' }) => {
  const links = ['Editor', 'Developers', 'About', 'Contacts'];

  return (
    <motion.div
      className="absolute flex flex-col rounded-xl -right-1 -top-1 -z-10 overflow-hidden bg-slate-700"
      animate={stage}
      data-testid="nav-secondary-menu-container"
      variants={variants}
    >
      {stage === 'open' && (
        <motion.ul
          data-testid="nav-secondary-menu-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="flex flex-col w-full h-full pl-4 justify-center gap-3"
        >
          {links.map((text, index) => (
            <motion.li
              key={text}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.1 * index,
                },
              }}
            >
              <NavigationButton text={text} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};
