import {useAppSelector} from './useAppSelector';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const useFeedback = () => {
  const {vibrateEnabled} = useAppSelector(state => state.userData.settings);

  const vibrate = () => {
    if (vibrateEnabled) {
      ReactNativeHapticFeedback.trigger('impactLight');
    }
  };

  return {vibrate};
};
