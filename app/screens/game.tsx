import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CoinSvg from '../components/CoinSvg';
import {GameHeader} from '../components/GameHeader';
import {GameTimer} from '../components/GameTimer';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {GameContainer} from '../containers/GameContainer';
import {useAppDispatch} from '../store';
import {
  buyClearBoard,
  buySolve,
  buyUndo,
  incrementLevel,
  resetLevel,
} from '../store/slicers/user.slice';
import {CLEAR_COST, SOLVE_COST, UNDO_COST} from '../constants/game';

const {width} = Dimensions.get('window');

export const GameScreen = () => {
  const dispatch = useAppDispatch();

  const [solving, setSolving] = useState(false);
  const boardRef = useRef<{
    solve: () => Promise<boolean>;
    undo: () => boolean;
    clearBoard: () => boolean;
  }>(null);

  const handleNextLevel = () => {
    dispatch(incrementLevel());
  };

  const handleReset = () => {
    dispatch(resetLevel());
  };

  const handleSolve = () => {
    if (boardRef.current) {
      setSolving(true);
      boardRef.current.solve().then(solved => {
        if (solved) {
          dispatch(buySolve());
        }
        setSolving(false);
      });
    }
  };

  const handleUndo = () => {
    if (boardRef.current) {
      const isUndone = boardRef.current.undo();
      if (isUndone) {
        dispatch(buyUndo());
      }
    }
  };

  const handleClear = () => {
    if (boardRef.current) {
      const cleared = boardRef.current.clearBoard();
      if (cleared) {
        dispatch(buyClearBoard());
      }
    }
  };

  return (
    <View style={styles.container}>
      <GameHeader />
      <View style={styles.gameContainer}>
        <GameTimer />
        <GameContainer ref={boardRef} />
        {/* Action Buttons Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={handleClear}>
            <Text style={styles.actionButtonText}>Clear</Text>
            <View style={styles.costContainer}>
              <CoinSvg width={14} height={14} />
              <Text style={styles.costText}>{CLEAR_COST}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.undoButton]}
            onPress={handleUndo}>
            <Text style={styles.actionButtonText}>Undo</Text>
            <View style={styles.costContainer}>
              <CoinSvg width={14} height={14} />
              <Text style={styles.costText}>{UNDO_COST}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.clueButton,
              solving && styles.disabledButton,
            ]}
            disabled={solving}
            onPress={handleSolve}>
            <Text style={styles.actionButtonText}>{'Solve'}</Text>
            <View style={styles.costContainer}>
              <CoinSvg width={14} height={14} />
              <Text style={styles.costText}>{SOLVE_COST}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleNextLevel}>
          <Text style={styles.buttonText}>Next Level</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer2} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Level</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backArrow: {
    fontSize: 24,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  points: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.semiBold,
  },
  starIcon: {
    fontSize: 20,
  },
  levelText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  coinWrapper: {
    position: 'absolute',
    right: 20,
  },
  gameContainer: {
    flex: 1,
    padding: 12,
  },
  timerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    minWidth: width * 0.8,
  },
  timerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  clockIcon: {
    fontSize: 24,
    color: colors.white,
  },
  timerText: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
  },
  resetButton: {
    borderColor: colors.orange,
  },
  undoButton: {
    borderColor: colors.gray,
  },
  clueButton: {
    borderColor: colors.indigo,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  costText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  buttonContainer: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer2: {
    backgroundColor: colors.warning,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer3: {
    backgroundColor: colors.premiumGreen,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});
