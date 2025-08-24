import React, {useEffect, useMemo} from 'react';
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
import CoinSvg from './CoinSvg';
import {EQText} from './EQText';
import {formatCoinCount} from '../utils/helpers';

interface CoinWrapProps {
  text?: string;
}

export const CoinWrap = ({text}: CoinWrapProps) => {
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
      <View style={styles.coinWrapper}>
        <CoinSvg width={24} height={24} />
      </View>
      <EQText style={styles.coinText}>{text ?? formattedCoinCount}</EQText>
    </Animated.View>
  );
};

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
