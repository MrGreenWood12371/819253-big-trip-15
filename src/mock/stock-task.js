import dayjs from 'dayjs';

export const stockTask = {
  'destination' : {
    'description': 'It could be a description',
    'name': 'Moscow',
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${Math.random()}`,
        'description': 'Fusce tristique felis at fermentum pharetra.',
      },
      {
        'src': `http://picsum.photos/300/200?r=${Math.random()}`,
        'description': 'Fusce tristique felis at fermentum pharetra.',
      },
      {
        'src': `http://picsum.photos/300/200?r=${Math.random()}`,
        'description': 'Fusce tristique felis at fermentum pharetra.',
      },
    ],
  },
  'type' : 'taxi',
  'basePrice' : '',
  'dateTo' : dayjs().toDate(),
  'dateFrom' : dayjs().toDate(),
  'offers' : [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    },
  ],
};
