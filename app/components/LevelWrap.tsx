import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import {EQText} from './EQText';
import LevelSvg from './LevelSvg';

export const LevelWrap = () => {
  const currentLevel = useAppSelector(state => state.userData.currentLevel);

  // Animation: scale up and back down when currentLevel changes
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.15, {duration: 120}),
      withTiming(1, {duration: 120}),
    );
  }, [currentLevel, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.coinWrapper}>
        <LevelSvg width={24} height={24} />
      </View>
      <EQText style={styles.coinText}>{currentLevel}</EQText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.white}30`,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    minWidth: 40,
  },
  coinText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 13,
  },
  coinWrapper: {
    position: 'absolute',
    left: -20.5,
  },
});
