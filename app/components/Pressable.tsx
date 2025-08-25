import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';

interface PressableProps extends TouchableOpacityProps {
  sound?: SOUNDS;
  disableAnimation?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const Pressable = ({
  sound,
  disableAnimation = false,
  style,
  ...props
}: PressableProps) => {
  const {play} = useSound();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = (event: GestureResponderEvent) => {
    if (!disableAnimation) {
      scale.value = withSpring(0.95, {
        damping: 7,
        stiffness: 300,
      });
    }
    if (props.onPressIn) {
      props.onPressIn(event);
    }
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    if (!disableAnimation) {
      scale.value = withSpring(1, {
        damping: 7,
        stiffness: 300,
      });
    }
    if (props.onPressOut) {
      props.onPressOut(event);
    }
  };

  const handlePress = (event: GestureResponderEvent) => {
    if (sound) {
      play(sound);
    }
    if (props.onPress) {
      props.onPress(event);
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      style={[animatedStyle, style]}>
      {props.children}
    </AnimatedTouchableOpacity>
  );
};
