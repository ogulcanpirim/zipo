import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import {SOUNDS} from '../models/game';
import {EQText} from './EQText';
import {Pressable} from './Pressable';

const INTERVAL_DURATION = 2000;
const SLIDE_DURATION = 500;

interface StartButtonProps {
  startGame: () => void;
}

export const StartButton = ({startGame}: StartButtonProps) => {
  const transformX = useSharedValue(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {pathColor} = useAppSelector(state => state.userData);

  const scaleValue = useDerivedValue(() => {
    return interpolate(transformX.value, [0, 200, 400], [1, 1.02, 1]);
  });

  const opacityValue = useDerivedValue(() => {
    return interpolate(transformX.value, [0, 200, 400], [0.2, 0.6, 0.2]);
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      runAnimation();
    }, INTERVAL_DURATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runAnimation = () => {
    transformX.value = withTiming(400, {duration: SLIDE_DURATION}, () => {
      transformX.value = 0;
    });
  };

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
          colors={[pathColor, `${pathColor}60`]}
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
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 16,
    width: 12,
    height: 100,
    left: -50,
  },
  animatedLineSecond: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    shadowColor: 'white',
    shadowOpacity: 0.8,
    shadowRadius: 32,
    width: 12,
    height: 100,
    left: -35,
  },
});
