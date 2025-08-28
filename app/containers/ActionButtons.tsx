import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CoinSvg from '../components/CoinSvg';
import {EQText} from '../components/EQText';
import {Pressable} from '../components/Pressable';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import {BoardRef, SOUNDS} from '../models/game';
import {useAppDispatch} from '../store';
import {buyClearBoard, buySolve, buyUndo} from '../store/slicers/user.slice';
import {formatCoinCount} from '../utils/helpers';

interface ActionButtonsContainerProps {
  level?: number;
  coinReward: number;
  boardRef: React.RefObject<BoardRef>;
}

export const ActionButtonsContainer = ({
  level,
  coinReward,
  boardRef,
}: ActionButtonsContainerProps) => {
  const dispatch = useAppDispatch();
  const [solving, setSolving] = useState(false);
  const {currentDraggedCells, coin, moves} = useAppSelector(
    state => state.userData,
  );
  const actionEnabled =
    currentDraggedCells.length > 0 && !solving && moves.length > 0;

  const prices = useMemo(() => {
    return {
      clear: Math.round(coinReward * 0.2),
      undo: Math.round(coinReward * 0.1),
      solve: Math.round(coinReward * 1.50),
    };
  }, [coinReward]);

  useEffect(() => {
    setSolving(false);
  }, [level]);

  const handleSolve = () => {
    if (boardRef.current) {
      setSolving(true);
      boardRef.current.solve().then(solved => {
        if (solved) {
          dispatch(buySolve(prices.solve));
        }
      });
    }
  };

  const handleUndo = () => {
    if (boardRef.current) {
      const isUndone = boardRef.current.undo();
      if (isUndone) {
        dispatch(buyUndo(prices.undo));
      }
    }
  };

  const handleClear = () => {
    if (boardRef.current) {
      const cleared = boardRef.current.clearBoard();
      if (cleared) {
        dispatch(buyClearBoard(prices.clear));
      }
    }
  };

  return (
    <View style={styles.buttonRow}>
      <Pressable
        style={styles.button}
        onPress={handleClear}
        disabled={
          solving || currentDraggedCells.length === 0 || prices.clear > coin
        }
        sound={SOUNDS.BUTTON_CLICK}>
        <LinearGradient
          colors={['#FF6B35', '#E55A2B']}
          style={[
            styles.actionButton,
            styles.resetButton,
            (!actionEnabled || prices.clear > coin) && styles.disabledButton,
          ]}>
          <EQText style={styles.actionButtonText}>Clear</EQText>
          <View style={styles.costContainer}>
            <CoinSvg width={14} height={14} />
            <EQText style={styles.costText}>
              {formatCoinCount(prices.clear)}
            </EQText>
          </View>
        </LinearGradient>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          (!actionEnabled || prices.undo > coin) && styles.disabledButton,
        ]}
        onPress={handleUndo}
        disabled={!actionEnabled || prices.undo > coin}
        sound={SOUNDS.BUTTON_CLICK}>
        <LinearGradient
          colors={['#6366F1', '#4F46E5']}
          style={[
            styles.actionButton,
            styles.undoButton,
            (!actionEnabled || prices.undo > coin) && styles.disabledButton,
          ]}>
          <EQText style={styles.actionButtonText}>Undo</EQText>
          <View style={styles.costContainer}>
            <CoinSvg width={14} height={14} />
            <EQText style={styles.costText}>
              {formatCoinCount(prices.undo)}
            </EQText>
          </View>
        </LinearGradient>
      </Pressable>

      <Pressable
        style={styles.button}
        disabled={solving || prices.solve > coin}
        onPress={handleSolve}
        sound={SOUNDS.BUTTON_CLICK}>
        <LinearGradient
          colors={['#10B981', '#059669']}
          style={[
            styles.actionButton,
            styles.clueButton,
            (solving || prices.solve > coin) && styles.disabledButton,
          ]}>
          <EQText style={styles.actionButtonText}>{'Solve'}</EQText>
          <View style={styles.costContainer}>
            <CoinSvg width={14} height={14} />
            <EQText style={styles.costText}>
              {formatCoinCount(prices.solve)}
            </EQText>
          </View>
        </LinearGradient>
      </Pressable>
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
  },
  button: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
    paddingHorizontal: 12,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  resetButton: {
    borderColor: '#E55A2B',
  },
  undoButton: {
    borderColor: '#4F46E5',
  },
  clueButton: {
    borderColor: '#059669',
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
  },
  costText: {
    fontFamily: fonts.bold,
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
