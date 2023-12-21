export const verticalPrimaryVariants = {
  open: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const verticalSecondaryVariants = {
  closed: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    y: '-100%',
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};
