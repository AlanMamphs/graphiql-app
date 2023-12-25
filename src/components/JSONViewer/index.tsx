import { getDrawnNodesFromObject } from '@/lib/utils';

export const JsonViewer = () => {
  const test_obj = {
    name: 'John',
    surname: 'Doe',
    age: 25,
    favouriteFood: ['apple', 'banana'],
    skills: {
      fastLearner: true,
    },
  };

  return (
    <div className="flex flex-wrap overflow-auto">
      <pre
        dangerouslySetInnerHTML={{
          __html: getDrawnNodesFromObject(test_obj, 0).join(''),
        }}
      ></pre>
    </div>
  );
};
