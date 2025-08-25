import {Player} from '@react-native-community/audio-toolkit';
import {SOUNDS} from '../models/game';
import {useAppSelector} from './useAppSelector';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const useSound = () => {
  const {soundEnabled, vibrateEnabled} = useAppSelector(
    state => state.userData.settings,
  );
  const play = (sound: SOUNDS, force?: boolean) => {
    const player = new Player(sound);
    if (soundEnabled || force) {
      player.play();
      if (vibrateEnabled) {
        ReactNativeHapticFeedback.trigger('contextClick');
      }
    }
  };

  return {
    play,
  };
};
