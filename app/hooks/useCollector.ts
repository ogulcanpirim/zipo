import redux, {storage} from '../store';
import moment from 'moment';
import {getCollectorRewardPerHour} from '../utils/helpers';
import {LAST_COLLECTED_TIME, MAX_WAIT_TIME} from '../constants/game';

export const useCollector = () => {
  const getLastCollectedTime = () => {
    const lastLoggedTime = storage.getString(LAST_COLLECTED_TIME);
    return lastLoggedTime ? moment(lastLoggedTime) : moment.now();
  };
  const storeLastCollectedTime = () => {
    const now = moment();
    storage.set(LAST_COLLECTED_TIME, now.toISOString());
  };

  const getIdleTime = () => {
    const lastCollectedTime = getLastCollectedTime();
    if (!lastCollectedTime) {
      return 0;
    }
    const minsDiff = moment().diff(lastCollectedTime, 'minutes');
    const hoursDiff = (minsDiff / 60).toFixed(2) as unknown as number;
    if (hoursDiff >= MAX_WAIT_TIME) {
      return MAX_WAIT_TIME;
    }
    return hoursDiff;
  };

  const getCollectorRate = () => {
    const {currentLevel, isPro} = redux.store.getState().userData;
    const reward = getCollectorRewardPerHour(currentLevel) * (isPro ? 2 : 1);
    return reward;
  };

  const getCollactableReward = () => {
    const idleTime = getIdleTime();
    const rate = getCollectorRate();
    return Math.floor(rate * idleTime);
  };

  const collectReward = () => {
    storeLastCollectedTime();
  };

  return {
    getCollactableReward,
    collectReward,
    getIdleTime,
  };
};
