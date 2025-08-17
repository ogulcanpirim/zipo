import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  BACKGROUND_ANIMATION_DURATION,
  SCALE_ANIMATION_DURATION,
} from '../constants/animations';
import {BOARD_COLOR, colors} from '../constants/colors';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import {EQText} from './EQText';
import {fonts} from '../constants/fonts';

const WALL_HW = 4;

interface CellProps {
  size: number;
  row: number;
  col: number;
  cellNumber?: number;
  activeCells: SharedValue<string[]>;
  cellSize: number;
  cellWalls: Array<[number, number, number]>;
}

export const Cell = React.memo(
  ({
    size,
    row,
    col,
    cellNumber,
    activeCells,
    cellSize,
    cellWalls,
  }: CellProps) => {
    const scale = useSharedValue(1);

    const cellKey = useMemo(() => `${row}-${col}`, [row, col]);

    const calculateCellStyle = useMemo(() => {
      return {
        width: cellSize,
        height: cellSize,
        left: col * cellSize,
        top: row * cellSize,
        borderTopLeftRadius: row === 0 && col === 0 ? 8 : 0,
        borderTopRightRadius: row === 0 && col === size - 1 ? 8 : 0,
        borderBottomLeftRadius: row === size - 1 && col === 0 ? 8 : 0,
        borderBottomRightRadius: row === size - 1 && col === size - 1 ? 8 : 0,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      };
    }, [row, col, cellSize, size]);

    const runScaleAnimation = () => {
      'worklet';
      scale.value = withSequence(
        withTiming(1.3, {duration: SCALE_ANIMATION_DURATION}),
        withTiming(1, {duration: SCALE_ANIMATION_DURATION}),
      );
    };

    useAnimatedReaction(
      () => activeCells.value.includes(cellKey),
      (isActive, previousIsActive) => {
        if (isActive !== previousIsActive) {
          runScaleAnimation();
        }
      },
      [activeCells],
    );
    const animatedStyle = useAnimatedStyle(() => {
      const isDragged = activeCells.value.includes(cellKey);
      const firstNumberToDrag =
        activeCells?.value.length === 1 && isDragged && !cellNumber;
      const active = isDragged && !firstNumberToDrag;
      return {
        backgroundColor: withTiming(
          active ? `${BOARD_COLOR}50` : 'rgba(255, 255, 255, 0.1)',
          {duration: BACKGROUND_ANIMATION_DURATION},
        ),
      };
    });

    const cellNumberContainerStyle = {
      width: cellSize * 0.5,
      height: cellSize * 0.5,
    };

    const cellTextStyle = {
      fontSize: cellSize * 0.3,
    };

    const animatedNumberContainerStyle = useAnimatedStyle(() => {
      const isDragged = activeCells.value.includes(cellKey);
      return {
        transform: [
          {
            scale: scale.value,
          },
        ],
        backgroundColor: withTiming(isDragged ? BOARD_COLOR : colors.white, {
          duration: BACKGROUND_ANIMATION_DURATION,
        }),
      };
    });

    const renderWalls = () => {
      return cellWalls.map(([_, __, side], index) => {
        let wallStyle: StyleProp<ViewStyle> = {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 100,
          borderRadius: WALL_HW / 2,
        };

        switch (side) {
          case 0: // Top wall
            wallStyle = {
              ...wallStyle,
              top: -WALL_HW / 2,
              left: 0,
              right: 0,
              height: WALL_HW,
            };
            break;
          case 1: // Right wall
            wallStyle = {
              ...wallStyle,
              top: 0,
              right: -WALL_HW / 2,
              bottom: 0,
              width: WALL_HW,
            };
            break;
          case 2: // Bottom wall
            wallStyle = {
              ...wallStyle,
              bottom: -WALL_HW / 2,
              left: 0,
              right: 0,
              height: WALL_HW,
            };
            break;
          case 3: // Left wall
            wallStyle = {
              ...wallStyle,
              top: 0,
              left: -WALL_HW / 2,
              bottom: 0,
              width: WALL_HW,
            };
            break;
        }

        return <View key={`wall-${index}`} style={wallStyle} />;
      });
    };

    return (
      <Animated.View style={[styles.cell, calculateCellStyle, animatedStyle]}>
        {cellNumber && (
          <Animated.View
            style={[
              styles.cellNumberContainer,
              cellNumberContainerStyle,
              animatedNumberContainerStyle,
            ]}>
            <EQText style={[styles.cellNumber, cellTextStyle]}>
              {cellNumber}
            </EQText>
          </Animated.View>
        )}
        {renderWalls()}
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  cell: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cellNumberContainer: {
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  cellNumber: {
    fontSize: 20,
    fontFamily: fonts.bold,
  },
});
