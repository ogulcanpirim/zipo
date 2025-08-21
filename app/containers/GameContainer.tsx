import React, {forwardRef, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Board} from '../components/Board';
import {useAppSelector} from '../hooks/useAppSelector';
import {Level} from '../models/game';
import {
  formatLevel,
  generateLevel,
  getDifficulty,
} from '../utils/levelGenerator';

interface GameContainerProps {
  level?: Level;
}

export const GameContainer = React.memo(
  forwardRef(({level}: GameContainerProps, ref) => {
    const currentLevel = useAppSelector(state => state.userData.currentLevel);
    const generatedLevel = useMemo(() => {
      if (level) {
        return level;
      }
      const difficulty = getDifficulty(currentLevel);
      return formatLevel(generateLevel(difficulty));
    }, [currentLevel, level]);

    return (
      <View style={styles.container}>
        <Board
          ref={ref}
          size={generatedLevel.gridSize}
          numbers={generatedLevel.numbers}
          walls={generatedLevel.walls}
          solvePath={generatedLevel.solutionPath}
          rewardCoin={100}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {},
});
