import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import {SOUNDS} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {getCurrentLevel} from '../utils/helpers';
import {EQText} from './EQText';
import {Pressable} from './Pressable';

const INTERVAL_DURATION = 2000;
const SLIDE_DURATION = 500;

const StartButtonComponent = () => {
  const {gameFinished} = useAppSelector(state => state.userData);
  const navigation = useAppNavigation();
  const startGame = () => {
    if (gameFinished) {
      navigation.navigate(SCREENS.LEVEL_ENTRANCE);
    } else {
      const level = getCurrentLevel();
      navigation.navigate(SCREENS.GAME, {level});
    }
  };

  const transformX = useSharedValue(0);
  const {pathColor} = useAppSelector(state => state.userData);

  const scaleValue = useDerivedValue(() => {
    return interpolate(transformX.value, [0, 200, 400], [1, 1.02, 1]);
  });

  const opacityValue = useDerivedValue(() => {
    return interpolate(transformX.value, [0, 200, 400], [0.2, 0.6, 0.2]);
  });

  transformX.value = withRepeat(
    withDelay(
      INTERVAL_DURATION,
      withSequence(
        withTiming(400, {duration: SLIDE_DURATION}),
        withTiming(0, {duration: 10}),
      ),
    ),
    -1,
  );

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: transformX.value}, {rotate: '20deg'}],
      opacity: opacityValue.value,
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });

  return (
    <Animated.View style={animatedContainerStyle}>
      <Pressable
        style={styles.startGameButton}
        onPress={startGame}
        sound={SOUNDS.BUTTON_CLICK}>
        <LinearGradient
          style={styles.startGameGradient}
          colors={[pathColor, `${pathColor}80`]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.startGameContent}>
            <FontAwesome6Icon
              name="play"
              size={20}
              color={colors.white}
              style={styles.playIcon}
            />
            <EQText style={styles.startGameText}>Start Game</EQText>
          </View>
        </LinearGradient>
        <Animated.View style={[styles.animatedLine, animatedLineStyle]} />
        <Animated.View style={[styles.animatedLineSecond, animatedLineStyle]} />
      </Pressable>
    </Animated.View>
  );
};

export const StartButton = React.memo(StartButtonComponent);

const styles = StyleSheet.create({
  startGameButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  startGameGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  startGameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginRight: 10,
  },
  startGameText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  animatedLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 12,
    height: 100,
    left: -50,
  },
  animatedLineSecond: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 12,
    height: 100,
    left: -35,
  },
});
