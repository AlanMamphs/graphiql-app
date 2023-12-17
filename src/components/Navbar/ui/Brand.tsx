import { useStages } from '@/hooks/useStages';
import { Navbar } from 'flowbite-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { brandVariants } from '../lib/variants';
import { Typography } from './Typography';

const Brand = () => {
  const { stage, onOpen, onClose } = useStages();
  return (
    <Navbar.Brand
      as={Link}
      href="/"
      data-testid="nav-brand"
      className="group gap-2"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <motion.div
        className="w-10 aspect-square relative"
        variants={brandVariants}
        animate={stage}
      >
        <Image alt="Logo" src="/favicon.png" fill />
      </motion.div>

      <Typography className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        GraphiQL Editor
      </Typography>
    </Navbar.Brand>
  );
};

export { Brand };
