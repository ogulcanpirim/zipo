import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import {Grid} from '../components/Grid';
import {Path, PathHandle} from '../components/Path';
import {
  BOARD_SCALE_DURATION,
  SHAKE_DURATION,
  SHAKE_OFFSET,
  SOLVE_OFFSET_DURATION,
} from '../constants/animations';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';
import {SCREENS} from '../navigation/screens';

const {width} = Dimensions.get('window');

export interface BoardProps {
  size: number;
  numbers: Array<[number, number, number]>;
  walls: Array<[number, number, number]>;
  solvePath: Array<[number, number]>;
  rewardCoin: number;
}

const BoardComponent = forwardRef(
  ({size, numbers, walls, solvePath, rewardCoin}: BoardProps, ref) => {
    const navigation = useAppNavigation();
    const pathRef = useRef<PathHandle>(null);

    const isDragging = useSharedValue(false);
    const draggedCells = useSharedValue<string[]>([]);
    const addedCells = useSharedValue<string[]>([]);

    const boardShake = useSharedValue(0);
    const boardScale = useSharedValue(1);
    const moves = useSharedValue<number[]>([]);
    const moveInGesture = useSharedValue(0);
    const solving = useSharedValue(false);

    const snapRef = useRef<any>();

    const cellSize = useMemo(() => Math.min(width - 20, 400) / size, [size]);
    const gameFinished = useSharedValue(false);
    const {play} = useSound();

    const handleClearPath = () => {
      if (pathRef.current?.clearPath) {
        runOnJS(pathRef.current.clearPath)();
      }
    };

    const clearBoard = () => {
      if (draggedCells.value.length === 0) {
        return false;
      }
      handleClearPath();
      isDragging.value = false;
      draggedCells.value = [];
      addedCells.value = [];
      gameFinished.value = false;
      moves.value = [];
      moveInGesture.value = 0;
      return true;
    };

    const resetGame = useCallback(() => {
      'worklet';
      clearBoard();
      gameFinished.value = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameFinished]);

    useEffect(() => {
      resetGame();
    }, [numbers, resetGame]);

    const numberLocations = useMemo(() => {
      const {min, max} = numbers.reduce(
        (acc, [r, c, value]) => {
          if (value > acc.max.value) {
            acc.max = {row: r, col: c, value};
          }
          if (value < acc.min.value) {
            acc.min = {row: r, col: c, value};
          }
          return acc;
        },
        {
          min: {row: 0, col: 0, value: Infinity},
          max: {row: 0, col: 0, value: -Infinity},
        },
      );

      return {
        min: {row: min.row, col: min.col},
        max: {row: max.row, col: max.col},
      };
    }, [numbers]);

    const getCellAtPosition = (x: number, y: number) => {
      'worklet';
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (col >= 0 && col < size && row >= 0 && row < size) {
        return {row, col};
      }
      return null;
    };

    const hasWallBetween = (
      row1: number,
      col1: number,
      row2: number,
      col2: number,
    ) => {
      'worklet';
      const rowDiff = row2 - row1;
      const colDiff = col2 - col1;

      if (
        (Math.abs(rowDiff) === 1 && colDiff === 0) ||
        (Math.abs(colDiff) === 1 && rowDiff === 0)
      ) {
        // Find wall data for both cells
        const cell1Walls = walls.filter(([r, c]) => r === row1 && c === col1);
        const cell2Walls = walls.filter(([r, c]) => r === row2 && c === col2);

        // Check for walls blocking the path
        if (rowDiff === 1) {
          // Moving down
          const hasBottomWall = cell1Walls.some(([_, __, side]) => side === 2); // Bottom wall
          const hasTopWall = cell2Walls.some(([_, __, side]) => side === 0); // Top wall
          return hasBottomWall || hasTopWall;
        } else if (rowDiff === -1) {
          // Moving up
          const hasTopWall = cell1Walls.some(([_, __, side]) => side === 0); // Top wall
          const hasBottomWall = cell2Walls.some(([_, __, side]) => side === 2); // Bottom wall
          return hasTopWall || hasBottomWall;
        } else if (colDiff === 1) {
          // Moving right
          const hasRightWall = cell1Walls.some(([_, __, side]) => side === 1); // Right wall
          const hasLeftWall = cell2Walls.some(([_, __, side]) => side === 3); // Left wall
          return hasRightWall || hasLeftWall;
        } else if (colDiff === -1) {
          // Moving left
          const hasLeftWall = cell1Walls.some(([_, __, side]) => side === 3); // Left wall
          const hasRightWall = cell2Walls.some(([_, __, side]) => side === 1); // Right wall
          return hasLeftWall || hasRightWall;
        }
      }
      return false;
    };

    const updatePathData = (path: string) => {
      ReactNativeHapticFeedback.trigger('impactLight');
      pathRef.current?.updatePathData?.(path);
    };

    const solve = async (): Promise<boolean> => {
      if (gameFinished.value) {
        return false;
      }

      if (!solvePath || solvePath.length === 0) {
        return false;
      }
      solving.value = true;

      let newDraggedCells: string[] = [];
      let newAddedCells: string[] = [];
      let newPath = '';

      for (let i = 0; i < solvePath.length; i++) {
        const [row, col] = solvePath[i];
        const cellKey = `${row}-${col}`;
        newDraggedCells = [...newDraggedCells, cellKey];

        const numberData = numbers.find(([x, y]) => x === row && y === col);
        if (numberData) {
          newAddedCells = [...newAddedCells, numberData[2].toString()];
        }

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        if (i === 0) {
          newPath = `M ${x} ${y}`;
        } else {
          newPath += ` L ${x} ${y}`;
        }

        runOnJS(updatePathData)(newPath);
        draggedCells.value = [...newDraggedCells];
        addedCells.value = [...newAddedCells];

        // Wait for the animation step
        await new Promise(resolve =>
          setTimeout(resolve, SOLVE_OFFSET_DURATION),
        );
      }
      winAnimation();
      return true;
    };

    const handleUndo = () => {
      'worklet';
      if (moves.value.length === 0) {
        return false;
      }
      if (pathRef.current?.undo && draggedCells.value.length > 0) {
        if (moves.value.length === 1) {
          moves.value = [];
          pathRef.current.clearPath();
          draggedCells.value = [];
          addedCells.value = [];
          isDragging.value = false;
          return true;
        }
        const movesToRemove =
          moves.value.length > 0 ? moves.value[moves.value.length - 1] : 0;
        pathRef.current.undo(movesToRemove);
        draggedCells.value = draggedCells.value.slice(0, -movesToRemove);
        addedCells.value = addedCells.value.slice(0, -movesToRemove);
        moves.value = moves.value.slice(0, -1);
      }
      return true;
    };

    useImperativeHandle(ref, () => ({
      solve,
      clearBoard,
      undo: handleUndo,
    }));

    const isLastDraggedCellNumber = () => {
      'worklet';
      if (draggedCells.value.length > 0) {
        const lastCellKey = draggedCells.value[draggedCells.value.length - 1];
        const [lastRow, lastCol] = lastCellKey.split('-').map(Number);
        return (
          numberLocations.max.row === lastRow &&
          numberLocations.max.col === lastCol
        );
      }
    };

    const isFirstDraggedCellNumber = () => {
      'worklet';
      if (draggedCells.value.length > 0) {
        const firstCellKey = draggedCells.value[0];
        const [firstRow, firstCol] = firstCellKey.split('-').map(Number);
        return (
          numberLocations.min.row === firstRow &&
          numberLocations.min.col === firstCol
        );
      }
      return false;
    };

    const isGameFinished = () => {
      'worklet';
      const sortedAddedCells = [...addedCells.value].sort();
      const isLastCellNumber = isLastDraggedCellNumber();
      const isFirstCellNumber = isFirstDraggedCellNumber();
      const isEqual =
        JSON.stringify(sortedAddedCells) === JSON.stringify(addedCells.value);
      return (
        draggedCells.value.length === size * size &&
        isEqual &&
        isLastCellNumber &&
        isFirstCellNumber
      );
    };

    const shakeBoard = () => {
      runOnJS(play)(SOUNDS.ERROR);
      boardShake.value = withSequence(
        withTiming(SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming(-SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming(SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming(-SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming(SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming(0, {duration: SHAKE_DURATION}),
      );
    };

    const captureBoard = () => {
      setTimeout(() => {
        snapRef?.current?.capture?.().then((uri: string) => {
          solving.value = false;
          navigation.navigate(SCREENS.GAME_FINISH, {
            imageUri: uri,
            rewardCoin: rewardCoin,
          });
        });
      }, 100);
    };

    const directToWin = () => {
      gameFinished.value = true;
      runOnJS(captureBoard)();
    };

    const winAnimation = () => {
      'worklet';
      runOnJS(play)(SOUNDS.SUCCESS);
      boardScale.value = withSequence(
        withTiming(1.05, {duration: BOARD_SCALE_DURATION}),
        withTiming(1, {duration: BOARD_SCALE_DURATION}),
        withTiming(1.05, {duration: BOARD_SCALE_DURATION}),
        withTiming(1, {duration: BOARD_SCALE_DURATION}, finished => {
          if (finished) {
            gameFinished.value = true;
            runOnJS(directToWin)();
          }
        }),
      );
    };

    const isBoardFilled = () => {
      'worklet';
      return draggedCells.value.length === size * size;
    };

    const checkFinish = () => {
      'worklet';
      if (isGameFinished()) {
        winAnimation();
      } else if (isBoardFilled()) {
        runOnJS(clearBoard)();
        runOnJS(shakeBoard)();
      }
    };

    // Draw the path
    useAnimatedReaction(
      () => draggedCells.value.length,
      length => {
        'worklet';
        if (length < 1) {
          return;
        }
        const newPath = draggedCells.value
          .map((cellKey, index) => {
            const [row, col] = cellKey.split('-').map(Number);
            const x = col * cellSize + cellSize / 2;
            const y = row * cellSize + cellSize / 2;
            return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
          })
          .join(' ');
        runOnJS(updatePathData)(newPath);
      },
    );

    const tapGesture = Gesture.Tap()
      .onStart(event => {
        'worklet';
        if (gameFinished.value || !isDragging.value || solving.value) {
          return;
        }
        const cell = getCellAtPosition(event.x, event.y);
        if (!isDragging.value) {
          return;
        }
        if (!cell) {
          return;
        }
        const cellKey = `${cell.row}-${cell.col}`;

        if (draggedCells.value.length === 0) {
          return;
        }

        // If already dragging, check if tapped cell is adjacent and not already in path
        const lastCellKey = draggedCells.value[draggedCells.value.length - 1];
        const [lastRow, lastCol] = lastCellKey.split('-').map(Number);
        const isAdjacent =
          (Math.abs(cell.row - lastRow) === 1 && cell.col === lastCol) ||
          (Math.abs(cell.col - lastCol) === 1 && cell.row === lastRow);

        // Check for wall between last cell and tapped cell
        const hasWall = hasWallBetween(lastRow, lastCol, cell.row, cell.col);

        if (isAdjacent && !draggedCells.value.includes(cellKey) && !hasWall) {
          draggedCells.value = [...draggedCells.value, cellKey];
          moveInGesture.value += 1;
        }
      })
      .onEnd(() => {
        'worklet';
        if (solving.value || gameFinished.value) {
          return;
        }
        if (moveInGesture.value > 0) {
          moves.value.push(moveInGesture.value);
          moveInGesture.value = 0;
        }
        checkFinish();
      });

    const panGesture = Gesture.Pan()
      .onBegin(event => {
        'worklet';
        if (solving.value) {
          return;
        }
        const cell = getCellAtPosition(event.x, event.y);
        if (moves.value.length === 0 && cell) {
          draggedCells.value = [
            ...draggedCells.value,
            `${cell.row}-${cell.col}`,
          ];
          moveInGesture.value += 1;
        }
      })
      .onStart(event => {
        'worklet';
        if (isDragging.value || gameFinished.value || solving.value) {
          return;
        }
        const cell = getCellAtPosition(event.x, event.y);
        if (cell) {
          isDragging.value = true;
        }
      })
      .onChange(event => {
        'worklet';
        if (gameFinished.value || solving.value) {
          return;
        }

        const cell = getCellAtPosition(event.x, event.y);
        if (cell && draggedCells.value.length > 0) {
          const cellKey = `${cell.row}-${cell.col}`;
          const cellNumber = numbers.find(
            ([x, y]) => x === cell.row && y === cell.col,
          )?.[2];
          if (cellNumber && !addedCells.value.includes(cellNumber.toString())) {
            addedCells.value = [...addedCells.value, cellNumber.toString()];
          }
          if (!draggedCells.value.includes(cellKey)) {
            const lastCellKey =
              draggedCells.value[draggedCells.value.length - 1];
            const [lastRow, lastCol] = lastCellKey.split('-').map(Number);

            const rowDiff = Math.abs(cell.row - lastRow);
            const colDiff = Math.abs(cell.col - lastCol);

            const isAdjacent =
              (rowDiff === 1 && colDiff === 0) ||
              (rowDiff === 0 && colDiff === 1);

            // Check if there's a wall blocking the path
            const hasWall = hasWallBetween(
              lastRow,
              lastCol,
              cell.row,
              cell.col,
            );

            if (isAdjacent && !hasWall) {
              draggedCells.value = [...draggedCells.value, cellKey];
              moveInGesture.value += 1;
            }
          }
        }
      })
      .onEnd(() => {
        'worklet';
        if (gameFinished.value || solving.value) {
          return;
        }
        moves.value.push(moveInGesture.value);
        moveInGesture.value = 0;
        checkFinish();
      });

    const simultaneousGesture = Gesture.Race(tapGesture, panGesture);

    const boardAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: boardShake.value}, {scale: boardScale.value}],
      };
    });

    return (
      <ViewShot ref={snapRef} options={{format: 'png', quality: 0.8}}>
        <GestureDetector gesture={simultaneousGesture}>
          <Animated.View
            style={[
              styles.board,
              {width: size * cellSize, height: size * cellSize},
              boardAnimatedStyle,
            ]}>
            <Grid
              size={size}
              numbers={numbers}
              walls={walls}
              cellSize={cellSize}
              draggedCells={draggedCells}
              cellWalls={walls}
            />
            <Path ref={pathRef} size={size} cellSize={cellSize} />
          </Animated.View>
        </GestureDetector>
      </ViewShot>
    );
  },
);

const styles = StyleSheet.create({
  board: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 20,
  },
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

export const Board = React.memo(BoardComponent);
