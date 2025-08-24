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
