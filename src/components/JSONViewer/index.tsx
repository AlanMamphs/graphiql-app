import { getDrawnNodesFromObject } from '@/lib/utils';
import { useState } from 'react';

const nestedObject = [
  {
    _id: '658960440c4194072f607341',
    index: 0,
    guid: 'be0f1550-1f17-4f45-8f20-aec211eee7ef',
    isActive: true,
    balance: '$2,173.05',
    picture: 'http://placehold.it/32x32',
    age: 33,
    eyeColor: 'blue',
    name: 'Mcintyre Park',
    gender: 'male',
    company: 'ZEDALIS',
    email: 'mcintyrepark@zedalis.com',
    phone: '+1 (969) 538-2681',
    address: '787 Lee Avenue, Enoree, Indiana, 4110',
    about:
      'Voluptate in sint tempor aliqua consectetur. Duis proident minim non labore qui aute eiusmod adipisicing aliqua esse ipsum nulla tempor. Non deserunt magna sunt ipsum sit ullamco eu fugiat consequat sit officia velit laboris. Consequat velit fugiat ut quis deserunt. Excepteur nostrud eu adipisicing fugiat tempor aute nostrud qui officia. Id amet irure in non et irure mollit esse culpa tempor incididunt.\r\n',
    registered: '2015-12-18T04:59:17 -01:00',
    latitude: -41.812101,
    longitude: -171.778081,
    tags: ['tempor', 'in', 'cupidatat', 'velit', 'adipisicing', 'eu', 'in'],
    friends: [
      {
        id: 0,
        name: 'Ethel Osborne',
      },
      {
        id: 1,
        name: 'Clarke Cruz',
      },
      {
        id: 2,
        name: 'Bray Obrien',
      },
    ],
    greeting: 'Hello, Mcintyre Park! You have 6 unread messages.',
    favoriteFruit: 'apple',
  },
  {
    _id: '658960447087b0b6cb1053de',
    index: 1,
    guid: '0f39a0c7-866e-40fb-bf67-60e842f18e03',
    isActive: true,
    balance: '$3,165.60',
    picture: 'http://placehold.it/32x32',
    age: 31,
    eyeColor: 'brown',
    name: 'Jamie Foster',
    gender: 'female',
    company: 'IDETICA',
    email: 'jamiefoster@idetica.com',
    phone: '+1 (942) 576-2781',
    address: '433 Stillwell Place, Falmouth, Minnesota, 615',
    about:
      'Sit velit nisi dolor mollit irure. Enim eiusmod exercitation pariatur nulla commodo quis exercitation magna id. Veniam ea esse eiusmod ex voluptate sit. Nisi minim aute voluptate laboris. Deserunt cillum laboris ex consectetur pariatur ullamco amet officia veniam voluptate aute. Irure deserunt excepteur elit ea sit incididunt. Minim non nostrud Lorem pariatur tempor nisi.\r\n',
    registered: '2018-04-27T01:40:36 -02:00',
    latitude: 89.292481,
    longitude: -90.543759,
    tags: ['irure', 'nisi', 'culpa', 'eu', 'id', 'do', 'dolore'],
    friends: [
      {
        id: 0,
        name: 'Kathie Little',
      },
      {
        id: 1,
        name: 'Mcgowan Daniels',
      },
      {
        id: 2,
        name: 'Bernice Haley',
      },
    ],
    greeting: 'Hello, Jamie Foster! You have 2 unread messages.',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '65896044cc68ad5653483387',
    index: 2,
    guid: 'bfd7b516-8a8c-4e2d-acec-1c45ed61e682',
    isActive: true,
    balance: '$2,786.26',
    picture: 'http://placehold.it/32x32',
    age: 30,
    eyeColor: 'blue',
    name: 'Glenna Mccray',
    gender: 'female',
    company: 'LYRICHORD',
    email: 'glennamccray@lyrichord.com',
    phone: '+1 (841) 576-2961',
    address: '779 Midwood Street, Dale, Florida, 3314',
    about:
      'Ex deserunt non sit sint duis elit in. Ex voluptate commodo adipisicing laboris deserunt adipisicing ut adipisicing ex dolor eiusmod culpa officia. Dolor elit ex Lorem voluptate excepteur aute sint Lorem qui eiusmod minim officia ea tempor. Incididunt cillum culpa laboris in sint tempor quis fugiat Lorem pariatur.\r\n',
    registered: '2015-12-20T02:32:00 -01:00',
    latitude: 72.707911,
    longitude: -87.013581,
    tags: [
      'laboris',
      'non',
      'proident',
      'tempor',
      'minim',
      'deserunt',
      'Lorem',
    ],
    friends: [
      {
        id: 0,
        name: 'Woodward Hoffman',
      },
      {
        id: 1,
        name: 'Leila Walters',
      },
      {
        id: 2,
        name: 'Marina Mathews',
      },
    ],
    greeting: 'Hello, Glenna Mccray! You have 5 unread messages.',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '6589604425bc7d38879a160f',
    index: 3,
    guid: '4c6ecca5-a45b-40de-9588-881d95bcaf26',
    isActive: false,
    balance: '$3,194.67',
    picture: 'http://placehold.it/32x32',
    age: 34,
    eyeColor: 'brown',
    name: 'Jessie Duke',
    gender: 'female',
    company: 'SKINSERVE',
    email: 'jessieduke@skinserve.com',
    phone: '+1 (929) 574-3833',
    address: '328 Vanderbilt Avenue, Lodoga, Oregon, 2051',
    about:
      'Aute ex dolor cupidatat quis ipsum laboris enim non qui. Ea tempor sit ex irure eiusmod nostrud nulla officia voluptate voluptate sunt. Consequat ex deserunt enim amet nisi excepteur mollit duis est. Consectetur id voluptate nulla aute incididunt. Tempor qui sint consequat sint duis esse exercitation adipisicing anim do magna enim. Id ut ad ex ut exercitation magna ipsum mollit id commodo sint ut mollit. Quis enim nulla voluptate eu cupidatat dolor aliqua aliqua.\r\n',
    registered: '2020-08-12T05:32:36 -02:00',
    latitude: -41.081385,
    longitude: -163.603352,
    tags: ['aute', 'nisi', 'incididunt', 'ullamco', 'eu', 'anim', 'anim'],
    friends: [
      {
        id: 0,
        name: 'Merritt Horn',
      },
      {
        id: 1,
        name: 'Marisa Rhodes',
      },
      {
        id: 2,
        name: 'Marcia Aguilar',
      },
    ],
    greeting: 'Hello, Jessie Duke! You have 2 unread messages.',
    favoriteFruit: 'apple',
  },
  {
    _id: '65896044905749fff9581ca4',
    index: 4,
    guid: 'f84e05fc-0b95-4056-8201-be69f2d01019',
    isActive: false,
    balance: '$3,941.79',
    picture: 'http://placehold.it/32x32',
    age: 28,
    eyeColor: 'blue',
    name: 'Alyson Reynolds',
    gender: 'female',
    company: 'REMOLD',
    email: 'alysonreynolds@remold.com',
    phone: '+1 (828) 552-2822',
    address: '426 Vandervoort Avenue, Ola, Missouri, 169',
    about:
      'Magna deserunt est consequat proident adipisicing aliquip et consectetur irure ipsum ea cillum. Consectetur irure fugiat voluptate et et enim fugiat nulla id excepteur velit. Cupidatat duis enim proident sunt cupidatat eiusmod velit voluptate ut irure enim. Qui enim in magna officia. Sit cillum commodo ad magna.\r\n',
    registered: '2014-09-06T03:33:38 -02:00',
    latitude: -8.343928,
    longitude: 146.548243,
    tags: ['do', 'dolore', 'fugiat', 'magna', 'laboris', 'est', 'laboris'],
    friends: [
      {
        id: 0,
        name: 'Lindsay Collier',
      },
      {
        id: 1,
        name: 'Kristin Boone',
      },
      {
        id: 2,
        name: 'Esmeralda Alford',
      },
    ],
    greeting: 'Hello, Alyson Reynolds! You have 10 unread messages.',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '6589604470bc5e50b7fdf5e7',
    index: 5,
    guid: 'bed05e59-f912-44fe-9d89-4e7ea47ceb79',
    isActive: true,
    balance: '$2,530.40',
    picture: 'http://placehold.it/32x32',
    age: 23,
    eyeColor: 'blue',
    name: 'Galloway Montgomery',
    gender: 'male',
    company: 'ZUVY',
    email: 'gallowaymontgomery@zuvy.com',
    phone: '+1 (985) 549-2831',
    address: '417 Linden Boulevard, Churchill, Arizona, 4542',
    about:
      'Laborum commodo voluptate qui est commodo non. Enim enim sit in ex quis incididunt. Esse irure consequat fugiat laborum sint nulla aliqua aute. Quis dolore quis mollit voluptate irure amet proident ad.\r\n',
    registered: '2014-12-23T07:07:18 -01:00',
    latitude: 13.679088,
    longitude: 28.81103,
    tags: [
      'mollit',
      'pariatur',
      'sit',
      'cillum',
      'ipsum',
      'reprehenderit',
      'sunt',
    ],
    friends: [
      {
        id: 0,
        name: 'Shepard Shelton',
      },
      {
        id: 1,
        name: 'Bowers Reeves',
      },
      {
        id: 2,
        name: 'Katina Nixon',
      },
    ],
    greeting: 'Hello, Galloway Montgomery! You have 9 unread messages.',
    favoriteFruit: 'banana',
  },
  {
    _id: '65896044e0d278c7bd43ae07',
    index: 6,
    guid: '8ec65132-b343-4a15-9bb5-aad65bba05e9',
    isActive: true,
    balance: '$1,530.14',
    picture: 'http://placehold.it/32x32',
    age: 30,
    eyeColor: 'green',
    name: 'Mayra Carr',
    gender: 'female',
    company: 'LIMOZEN',
    email: 'mayracarr@limozen.com',
    phone: '+1 (978) 540-3881',
    address: '906 Bay Street, Rossmore, West Virginia, 7988',
    about:
      'Adipisicing ad ullamco quis ipsum qui ipsum ipsum proident aute. Minim ullamco dolore enim aliqua. Nulla in officia commodo excepteur amet eiusmod incididunt aliqua aliquip dolor dolor aliqua.\r\n',
    registered: '2015-12-09T05:11:39 -01:00',
    latitude: -62.543179,
    longitude: 94.496887,
    tags: ['in', 'mollit', 'mollit', 'elit', 'pariatur', 'cillum', 'nisi'],
    friends: [
      {
        id: 0,
        name: 'Kathryn Mejia',
      },
      {
        id: 1,
        name: 'Munoz Duffy',
      },
      {
        id: 2,
        name: 'Bowen Andrews',
      },
    ],
    greeting: 'Hello, Mayra Carr! You have 3 unread messages.',
    favoriteFruit: 'apple',
  },
];

export const JsonViewer = () => {
  return (
    <div className="flex flex-wrap overflow-auto">
      <pre
        dangerouslySetInnerHTML={{
          __html: getDrawnNodesFromObject(nestedObject[0], 0).join(''),
        }}
      ></pre>
    </div>
  );
};
