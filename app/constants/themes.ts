export interface Theme {
  id: number;
  name: string;
  color: string;
  price: number;
  unlocked: boolean;
  description: string;
}

export const PATH_THEMES: Theme[] = [
  {
    id: 1,
    name: 'Classic Pink',
    color: '#EC4899',
    price: 0,
    unlocked: true,
    description: 'The original pink path',
  },
  {
    id: 2,
    name: 'Ocean Blue',
    color: '#00BFA5',
    price: 2500,
    unlocked: false,
    description: 'Calming ocean blue path',
  },
  {
    id: 3,
    name: 'Sunset Orange',
    color: '#F97316',
    price: 5000,
    unlocked: false,
    description: 'Warm sunset orange path',
  },
  {
    id: 4,
    name: 'Royal Purple',
    color: '#8B5CF6',
    price: 10000,
    unlocked: false,
    description: 'Elegant royal purple path',
  },
  {
    id: 5,
    name: 'Emerald Green',
    color: '#10B981',
    price: 50000,
    unlocked: false,
    description: 'Vibrant emerald green path',
  },
  {
    id: 6,
    name: 'Golden Yellow',
    color: '#FACC15',
    price: 100000,
    unlocked: false,
    description: 'Shining golden yellow path',
  },
  {
    id: 7,
    name: 'Crimson Red',
    color: '#EF4444',
    price: 200000,
    unlocked: false,
    description: 'Bold crimson red path',
  },
  {
    id: 8,
    name: 'Midnight Black',
    color: '#1F2937',
    price: 400000,
    unlocked: false,
    description: 'Premium midnight black path',
  },
];
