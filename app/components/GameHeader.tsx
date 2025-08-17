import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {CoinWrap} from '../components/CoinWrap';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useAppSelector} from '../hooks/useAppSelector';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const POP_ANIMATION_DURATION = 150;

export const GameHeader = () => {
  const navigation = useAppNavigation();
  const currentLevel = useAppSelector(state => state.userData.currentLevel);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.3, {duration: POP_ANIMATION_DURATION}),
      withTiming(1, {duration: POP_ANIMATION_DURATION}),
    );
  }, [currentLevel, scale]);

  const animatedLevelStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <FontAwesome6Icon name="chevron-left" size={20} color={colors.white} />
      </TouchableOpacity>
      <Animated.View style={animatedLevelStyle}>
        <Text style={styles.levelText}>{`Level ${currentLevel}`}</Text>
      </Animated.View>
      <View style={styles.coinWrapper}>
        <CoinWrap />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
