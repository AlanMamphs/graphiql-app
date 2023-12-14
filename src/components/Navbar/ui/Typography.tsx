import { motion } from 'framer-motion';
import { typographyVariants } from '../lib/variants';

interface Props {
  text: string;
  className?: string;
  stage: string;
}

export const Typography = ({ text, stage, className }: Props) => (
  <motion.p className={className}>
    {text.split('').map((item, index) => (
      <motion.span
        key={item + index}
        custom={index + 1}
        variants={typographyVariants}
        animate={stage}
        initial={{ color: 'white' }}
        className="text-slate-400"
      >
        {item}
      </motion.span>
    ))}
  </motion.p>
);
