import store from '../store';

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
  return levelData[(level - 1) % chunkSize];
};

export const getCurrentLevel = () => {
  const currentLevel = store.getState().userData.currentLevel;
  return getLevel(currentLevel);
};

export const getSectionReward = () => {};

export const formatCoinCount = (coinCount: number) => {
  if (coinCount >= 1000000) {
    return `${(coinCount / 1000000).toFixed(2)}M`;
  }
  if (coinCount >= 1000) {
    return `${(coinCount / 1000).toFixed(2)}K`;
  }
  return coinCount.toString();
};
