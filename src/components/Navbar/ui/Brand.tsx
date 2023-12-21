import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { DURATION_TIME } from '../lib/variants';

const Brand = ({ stage }: { stage: 'open' | 'closed' }) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: DURATION_TIME * 0.001 },
    },
    closed: {
      y: '-120%',
      opacity: 0,
      transition: { duration: DURATION_TIME * 0.001 },
    },
  };

  return (
    <Link
      href="/"
      data-testid="nav-brand"
      className="w-fit flex gap-2 items-center text-xl overflow-hidden"
    >
      <motion.div
        className="w-10 aspect-square relative"
        animate={{
          rotate: [0, 360],
          transition: {
            duration: DURATION_TIME * 0.1,
            repeat: Infinity,
          },
        }}
      >
        <Image alt="Logo" src="/favicon.png" fill />
      </motion.div>

      <motion.p className="whitespace-nowrap font-semibold dark:text-white">
        GraphiQL Editor
      </motion.p>
    </Link>
  );
};

export { Brand };
