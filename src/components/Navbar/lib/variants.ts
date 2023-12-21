export const DURATION_TIME = 300;

const transition = { duration: DURATION_TIME * 0.001 };

export const underlineVariants = {
  start: {
    left: '-100%',
    transition,
  },
  preserved: {
    left: '0%',
    transition,
  },
  end: {
    left: '100%',
    transition,
  },
  reset: {
    left: '-100%',
    transition: { duration: 0 },
  },
};

export const navBarVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
