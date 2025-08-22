import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CoinSvg from '../components/CoinSvg';
import {EQText} from '../components/EQText';
import {GameHeader} from '../components/GameHeader';
import {GameTimer} from '../components/GameTimer';
import {Pressable} from '../components/Pressable';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {CLEAR_COST, SOLVE_COST, UNDO_COST} from '../constants/game';
import {GameContainer} from '../containers/GameContainer';
import {Level, SOUNDS} from '../models/game';
import {useAppDispatch} from '../store';
import {buyClearBoard, buySolve, buyUndo} from '../store/slicers/user.slice';
import {AdBanner} from '../components/AdBanner';

const {width} = Dimensions.get('window');

interface GameRouteParams {
  level?: Level;
  endless?: boolean;
}

export const GameScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<{params: GameRouteParams}>>();

  const [solving, setSolving] = useState(false);
  const boardRef = useRef<{
    solve: () => Promise<boolean>;
    undo: () => boolean;
    clearBoard: () => boolean;
  }>(null);

  useEffect(() => {
    setSolving(false);
  }, [route.params?.level]);

  const handleSolve = () => {
    if (boardRef.current) {
      setSolving(true);
      boardRef.current.solve().then(solved => {
        if (solved) {
          dispatch(buySolve());
        }
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
    <>
      <View style={styles.container}>
        <GameHeader level={route?.params?.level?.id} />
        <View style={styles.gameContainer}>
          {route.params?.endless && <GameTimer />}
          <GameContainer ref={boardRef} level={route.params?.level} />
          <View style={styles.buttonRow}>
            <Pressable
              style={styles.button}
              onPress={handleClear}
              disabled={solving}
              sound={SOUNDS.BUTTON_CLICK}>
              <LinearGradient
                colors={['#FF6B35', '#E55A2B']}
                style={[
                  styles.actionButton,
                  styles.resetButton,
                  solving && styles.disabledButton,
                ]}>
                <EQText style={styles.actionButtonText}>Clear</EQText>
                <View style={styles.costContainer}>
                  <CoinSvg width={14} height={14} />
                  <EQText style={styles.costText}>{CLEAR_COST}</EQText>
                </View>
              </LinearGradient>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleUndo}
              disabled={solving}
              sound={SOUNDS.BUTTON_CLICK}>
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                style={[
                  styles.actionButton,
                  styles.undoButton,
                  solving && styles.disabledButton,
                ]}>
                <EQText style={styles.actionButtonText}>Undo</EQText>
                <View style={styles.costContainer}>
                  <CoinSvg width={14} height={14} />
                  <EQText style={styles.costText}>{UNDO_COST}</EQText>
                </View>
              </LinearGradient>
            </Pressable>

            <Pressable
              style={styles.button}
              disabled={solving}
              onPress={handleSolve}
              sound={SOUNDS.BUTTON_CLICK}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={[
                  styles.actionButton,
                  styles.clueButton,
                  solving && styles.disabledButton,
                ]}>
                <EQText style={styles.actionButtonText}>{'Solve'}</EQText>
                <View style={styles.costContainer}>
                  <CoinSvg width={14} height={14} />
                  <EQText style={styles.costText}>{SOLVE_COST}</EQText>
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
      <AdBanner />
    </>
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
  button: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
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
