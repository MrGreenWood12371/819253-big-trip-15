import { getRandomInteger } from '../utils';

const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateDestinationDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);

  let descriptionText = '';
  for (let i = 0; i < descriptionLength; i++) {
    descriptionText += descriptions[getRandomInteger(0, descriptions.length - 1)];
  }

  return descriptionText;
};

const generateDestinationName = () => {
  const destinations = [
    'Chamonix',
    'Geneva',
    'Amsterdam',
    'Moscow',
    'Naryan-Mar',
    'Vladivostok',
    'Paris',
    'Los Angeles',
    'San Francisco',
  ];

  return destinations[getRandomInteger(0, destinations.length - 1)];
};

export const generateDestination = () => ({
  'description': generateDestinationDescription(),
  'name': generateDestinationName(),
  'pictures': [
    {
      'src': `http://picsum.photos/300/200?r=${Math.random()}`,
      'description': generateDestinationDescription(),
    },
    {
      'src': `http://picsum.photos/300/200?r=${Math.random()}`,
      'description': generateDestinationDescription(),
    },
    {
      'src': `http://picsum.photos/300/200?r=${Math.random()}`,
      'description': generateDestinationDescription(),
    },
  ],
});

