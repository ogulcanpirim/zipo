import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {GameHeader} from '../components/GameHeader';
import {GameTimer} from '../components/GameTimer';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {ActionButtonsContainer} from '../containers/ActionButtons';
import {GameContainer} from '../containers/GameContainer';
import {BoardRef, Level} from '../models/game';

interface GameRouteParams {
  level?: Level;
  endless?: boolean;
}

export const GameScreen = () => {
  const route = useRoute<RouteProp<{params: GameRouteParams}>>();
  const boardRef = useRef<BoardRef>(null);

  return (
    <View style={styles.container}>
      <GameHeader level={route?.params?.level?.id} />
      <View style={styles.gameContainer}>
        {route.params?.endless && <GameTimer />}
        <GameContainer ref={boardRef} level={route.params?.level} />
        <ActionButtonsContainer
          level={route.params?.level?.id}
          coinReward={route.params?.level?.coinReward ?? 100}
          boardRef={boardRef}
        />
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
