import {ELevelDifficulty} from '../models/game';

export const START_COIN = 500;
export const LEVEL_SIZES = {
  [ELevelDifficulty.BABY]: 200,
  [ELevelDifficulty.CHILD]: 200,
  [ELevelDifficulty.EASY]: 300,
  [ELevelDifficulty.NORMAL]: 200,
  [ELevelDifficulty.MEDIUM]: 200,
};
export const MAX_LEVEL = 1100;

export const COIN_PACKS = [
  {
    id: 1,
    price: 49.99,
    day: 3,
  },
  {
    id: 2,
    price: 159.99,
    day: 15,
  },
  {
    id: 3,
    price: 499.99,
    day: 60,
  },
  {
    id: 4,
    price: 999.99,
    day: 250,
  },
];

export const LAST_COLLECTED_TIME = 'last_collected_time';
export const MAX_WAIT_TIME = 8; // hours

export const DEV_MODE_ENABLED = true;
