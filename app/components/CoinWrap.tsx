import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import CoinSvg from './CoinSvg';
import {EQText} from './EQText';
import {formatCoinCount} from '../utils/helpers';

export const CoinWrap = () => {
  const coinCount = useAppSelector(state => state.userData.coin);

  const formattedCoinCount = useMemo(
    () => formatCoinCount(coinCount).toString(),
    [coinCount],
  );

  // Animation: scale up and back down when coinCount changes
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.15, {duration: 120}),
      withTiming(1, {duration: 120}),
    );
  }, [coinCount, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CoinSvg width={20} height={20} />
      <EQText style={styles.coinText}>{formattedCoinCount}</EQText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: `${colors.white}30`,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8,
  },
  coinText: {
    fontFamily: fonts.bold,
    color: colors.white,
  },
});
