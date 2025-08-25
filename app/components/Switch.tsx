import React, {memo, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '../constants/colors';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch = memo(
  ({value, onValueChange, disabled = false}: SwitchProps) => {
    const offset = useSharedValue(value ? 22 : 0);

    useEffect(() => {
      offset.value = withSpring(value ? 22 : 0, {
        damping: 20,
        stiffness: 180,
        mass: 0.5,
      });
    }, [value, offset]);

    const toggleSwitch = () => {
      if (disabled) {
        return;
      }
      onValueChange(!value);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: offset.value}],
      };
    });

    const containerStyle = {
      backgroundColor: value ? colors.premiumGreen : '#3a3a3a',
      borderColor: colors.darkBorder,
      borderWidth: 1,
      opacity: disabled ? 0.5 : 1,
    };

    const knobStyle = {
      backgroundColor: '#f0f0f0',
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 3,
      shadowOpacity: 0.4,
      elevation: 2,
    };

    return (
      <Pressable
        onPress={toggleSwitch}
        style={[styles.container, containerStyle]}>
        <Animated.View style={[styles.knob, knobStyle, animatedStyle]} />
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 26,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
