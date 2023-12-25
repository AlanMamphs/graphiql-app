import { getJsonNodes } from './lib';

export const JsonViewer = () => {
  const test_obj = {
    index: 0,
    isActive: true,
    balance: '$3,206.73',
    picture: 'http://placehold.it/32x32',
    age: 36,
    eyeColor: 'brown',
    name: 'Cleo Stokes',
    latitude: -82.085163,
    longitude: 48.691609,
    friends: [
      {
        id: 0,
        name: 'Danielle Hill',
      },
      {
        id: 1,
        name: 'Mercer Boyle',
      },
      {
        id: 2,
        name: 'Hutchinson Warner',
      },
    ],
  };

  return (
    <div className="flex flex-wrap overflow-auto">
      <pre>{getJsonNodes(test_obj)}</pre>
    </div>
  );
};
