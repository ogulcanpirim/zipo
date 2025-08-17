import React, {forwardRef, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Board} from '../components/Board';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  formatLevel,
  generateLevel,
  getDifficulty,
} from '../utils/levelGenerator';

export const GameContainer = React.memo(
  forwardRef((_, ref) => {
    const currentLevel = useAppSelector(state => state.userData.currentLevel);
    const generatedLevel = useMemo(() => {
      const difficulty = getDifficulty(currentLevel);
      console.log('difficulty', difficulty);
      return formatLevel(generateLevel('easy'));
    }, [currentLevel]);

    return (
      <View style={styles.container}>
        <Board
          ref={ref}
          size={generatedLevel.gridSize}
          numbers={generatedLevel.numbers}
          walls={generatedLevel.walls}
          solvePath={generatedLevel.solutionPath}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {},
});
