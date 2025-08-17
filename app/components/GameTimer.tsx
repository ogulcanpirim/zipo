import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {EQText} from './EQText';

interface GameTimerProps {
  onTimeUp?: () => void;
  duration?: number; // in seconds
  isPaused?: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  onTimeUp,
  duration = 30,
  isPaused = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const progressValue = useSharedValue(1);
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const handleTimeUp = useCallback(() => {
    setIsRunning(false);
    if (onTimeUp) {
      onTimeUp();
    }
  }, [onTimeUp]);

  const updateProgress = useCallback(
    (newTime: number) => {
      progressValue.value = withTiming(newTime / duration, {duration: 1000});
    },
    [duration, progressValue],
  );

  const addPulseAnimation = useCallback(() => {
    scaleValue.value = withTiming(1.05, {duration: 200});
    setTimeout(() => {
      scaleValue.value = withTiming(1, {duration: 200});
    }, 200);
  }, [scaleValue]);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
      opacity: opacityValue.value,
    };
  });

  useEffect(() => {
    progressValue.value = 1;
  }, [progressValue]);

  useEffect(() => {
    if (isPaused || !isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;
        runOnJS(updateProgress)(newTime);
        if (newTime <= 10) {
          runOnJS(addPulseAnimation)();
        }
        if (newTime <= 0) {
          runOnJS(handleTimeUp)();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isPaused,
    isRunning,
    duration,
    addPulseAnimation,
    handleTimeUp,
    updateProgress,
  ]);

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  const getGradientColors = () => {
    const progress = timeLeft / duration;
    if (progress > 0.6) {
      return ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)'];
    } else if (progress > 0.3) {
      return ['rgba(255, 193, 7, 0.3)', 'rgba(255, 152, 0, 0.2)'];
    } else {
      return ['rgba(244, 67, 54, 0.3)', 'rgba(229, 57, 53, 0.2)'];
    }
  };

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <LinearGradient
        style={styles.timerCard}
        colors={getGradientColors()}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.timerContent}>
          <View style={styles.timerHeader}>
            <FontAwesome6Icon
              name="clock"
              size={20}
              color={colors.white}
              style={styles.timerIcon}
            />
            <EQText style={styles.timerText}>{formatTime(timeLeft)}</EQText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, progressAnimatedStyle]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  timerCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  timerContent: {
    alignItems: 'center',
  },
  timerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timerIcon: {
    marginRight: 8,
  },
  timerText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressTrack: {
    width: '100%',
    maxWidth: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
});
