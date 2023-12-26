import { useState } from 'react';

export const useStages = (defaultState?: 'open' | 'closed') => {
  const [stage, setStage] = useState<'open' | 'closed'>(
    defaultState || 'closed'
  );

  const onOpen = () => setStage('open');
  const onClose = () => setStage('closed');

  return {
    stage,
    onOpen,
    onClose,
  };
};
