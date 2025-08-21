import {ELevelDifficulty} from '../models/game';

export const START_COIN = 1438521;
export const CLEAR_COST = 50;
export const UNDO_COST = 25;
export const SOLVE_COST = 100;
export const LEVEL_SIZES = {
  [ELevelDifficulty.BABY]: 200,
  [ELevelDifficulty.CHILD]: 200,
  [ELevelDifficulty.EASY]: 300,
  [ELevelDifficulty.NORMAL]: 200,
  [ELevelDifficulty.MEDIUM]: 200,
};
