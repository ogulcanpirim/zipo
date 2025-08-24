import React, {forwardRef, useMemo} from 'react';
import ViewShot from 'react-native-view-shot';
import {Board} from '../components/Board';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {Level} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {
  formatLevel,
  generateLevel,
  getDifficulty,
} from '../utils/levelGenerator';
import {useAppDispatch} from '../store';
import {clearDraggedCells} from '../store/slicers/user.slice';

interface GameContainerProps {
  level?: Level;
}

export const GameContainer = React.memo(
  forwardRef(({level}: GameContainerProps, ref) => {
    const dispatch = useAppDispatch();
    const navigation = useAppNavigation();
    const snapRef = React.useRef<ViewShot>(null);
    const currentLevel = useAppSelector(state => state.userData.currentLevel);
    const generatedLevel = useMemo(() => {
      if (level) {
        return level;
      }
      const difficulty = getDifficulty(currentLevel);
      return formatLevel(generateLevel(difficulty));
    }, [currentLevel, level]);

    const captureBoard = () => {
      setTimeout(() => {
        snapRef?.current?.capture?.().then((uri: string) => {
          dispatch(clearDraggedCells());
          navigation.navigate(SCREENS.GAME_FINISH, {
            imageUri: uri,
            rewardCoin: level?.coinReward,
            level_id: level?.id,
          });
        });
      }, 100);
    };

    return (
      <ViewShot ref={snapRef} options={{format: 'png', quality: 1.0}}>
        <Board
          ref={ref}
          size={generatedLevel.gridSize}
          numbers={generatedLevel.numbers}
          walls={generatedLevel.walls}
          solvePath={generatedLevel.solutionPath}
          captureBoard={captureBoard}
          level_id={level?.id}
        />
      </ViewShot>
    );
  }),
);
