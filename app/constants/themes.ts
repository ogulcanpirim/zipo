export interface Theme {
  id: number;
  name: string;
  color: string;
  price: number;
  description: string;
}

export const PATH_THEMES: Theme[] = [
  {
    id: 1,
    name: 'Classic Pink',
    color: '#EC4899',
    price: 0,
    description: 'The original pink path',
  },
  {
    id: 2,
    name: 'Ocean Blue',
    color: '#00BFA5',
    price: 5000,
    description: 'Calming ocean blue path',
  },
  {
    id: 3,
    name: 'Sunset Orange',
    color: '#F97316',
    price: 10000,
    description: 'Warm sunset orange path',
  },
  {
    id: 4,
    name: 'Royal Purple',
    color: '#8B5CF6',
    price: 20000,
    description: 'Elegant royal purple path',
  },
  {
    id: 5,
    name: 'Emerald Green',
    color: '#10B981',
    price: 40000,
    description: 'Vibrant emerald green path',
  },
  {
    id: 6,
    name: 'Golden Yellow',
    color: '#FACC15',
    price: 100000,
    description: 'Shining golden yellow path',
  },
  {
    id: 7,
    name: 'Crimson Red',
    color: '#EF4444',
    price: 200000,
    description: 'Bold crimson red path',
  },
  {
    id: 8,
    name: 'Sky Cyan',
    color: '#06B6D4',
    price: 400000,
    description: 'Bright sky cyan path',
  },
  {
    id: 9,
    name: 'Lime Glow',
    color: '#A3E635',
    price: 800000,
    description: 'Glowing lime green path',
  },
  {
    id: 10,
    name: 'Magenta Burst',
    color: '#D946EF',
    price: 1600000,
    description: 'Vibrant magenta burst path',
  },
  {
    id: 11,
    name: 'Arctic White',
    color: '#F3F4F6',
    price: 3200000,
    description: 'Premium arctic white path',
  },
];
