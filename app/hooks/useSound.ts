import {Player} from '@react-native-community/audio-toolkit';
import {SOUNDS} from '../models/game';

export const useSound = () => {
  const play = (sound: SOUNDS) => {
    const player = new Player(sound);
    player.play();
  };

  return {
    play,
  };
};
