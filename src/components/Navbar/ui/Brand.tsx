import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { DURATION_TIME } from '../lib/variants';
import { NavButton } from './Button';

const Brand = () => {
  return (
    <Link
      href="/"
      data-testid="nav-brand"
      className="w-fit flex gap-2 items-center text-xl overflow-hidden"
    >
      <m.div
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
      </m.div>

      <NavButton text="GraphiQL" />
    </Link>
  );
};

export { Brand };
