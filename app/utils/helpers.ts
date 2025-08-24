import {MAX_LEVEL} from '../constants/game';
import redux from '../store';

export const getLevelData = (id: number) => {
  switch (id) {
    case 1:
      return require('../levels/levels-1.json');
    case 2:
      return require('../levels/levels-2.json');
    case 3:
      return require('../levels/levels-3.json');
    case 4:
      return require('../levels/levels-4.json');
    case 5:
      return require('../levels/levels-5.json');
    case 6:
      return require('../levels/levels-6.json');
    case 7:
      return require('../levels/levels-7.json');
    case 8:
      return require('../levels/levels-8.json');
    case 9:
      return require('../levels/levels-9.json');
    case 10:
      return require('../levels/levels-10.json');
    case 11:
      return require('../levels/levels-11.json');
    default:
      return [];
  }
};

export const getLevel = (level: number) => {
  const chunkSize = 100;
  const chunkId = Math.ceil(level / chunkSize);
  const levelData = getLevelData(chunkId);
  const coinReward = getSectionReward(level);
  return {...levelData[(level - 1) % chunkSize], coinReward};
};

export const getCurrentLevel = () => {
  const currentLevel = redux.store.getState().userData.currentLevel;
  return getLevel(currentLevel);
};

const REWARD_TABLE = [
  [5, 10, 15, 20],
  [30, 40, 50, 60],
  [80, 100, 120, 140],
  [180, 220, 260, 300],
  [380, 460, 540, 620],
  [780, 940, 1100, 1260],
  [1580, 1900, 2220, 2540],
  [3180, 3740, 4300, 4860],
  [6380, 7340, 8300, 9260],
  [12780, 14700, 16620, 18540],
  [25580, 28700, 31820, 34940],
];

export const getSectionReward = (level: number) => {
  const block = Math.floor(level / 100);
  const section = (level % 100 === 0 ? 4 : Math.ceil((level % 100) / 25)) - 1;
  if (level === MAX_LEVEL) {
    return REWARD_TABLE[10][3];
  }
  return REWARD_TABLE[block][section];
};

export const formatCoinCount = (coinCount: number) => {
  if (coinCount >= 1000000) {
    return `${(coinCount / 1000000).toFixed(2)}M`;
  }
  if (coinCount >= 1000) {
    return `${(coinCount / 1000).toFixed(2)}K`;
  }
  return coinCount?.toString();
};
