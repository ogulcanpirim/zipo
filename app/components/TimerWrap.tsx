import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {EQText} from './EQText';
import {TimerSvg} from './TimerSvg';
import {Pressable} from './Pressable';
import {SOUNDS} from '../models/game';
import {useModal} from '../hooks/useModal';
import {Collector} from './Collector';

const TimerWrap = () => {
  const rotate = useSharedValue(0);
  const {expand} = useModal();

  const handlePress = () => {
    expand({
      content: <Collector />,
    });
  };

  rotate.value = withRepeat(
    withSequence(
      withDelay(2000, withTiming(-4, {duration: 100})),
      withTiming(4, {duration: 100}),
      withTiming(-4, {duration: 100}),
      withTiming(4, {duration: 100}),
      withTiming(0, {duration: 100}),
    ),
    -1,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotate.value}deg`}],
  }));

  return (
    <Pressable sound={SOUNDS.BUTTON_CLICK} onPress={handlePress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.coinWrapper}>
          <TimerSvg width={26} height={26} />
        </View>
        <EQText style={styles.coinText}>Collector</EQText>
      </Animated.View>
    </Pressable>
  );
};

export default TimerWrap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.white}30`,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 6,
    paddingVertical: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  coinText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 13,
  },
  coinWrapper: {
    position: 'absolute',
    left: -19,
  },
});
