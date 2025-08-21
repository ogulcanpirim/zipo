import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useSound} from '../hooks/useSound';
import {Level, SOUNDS} from '../models/game';
import {EQText} from './EQText';

interface LevelBlockProps {
  level: Level;
  isCurrentLevel: boolean;
  isCompleted: boolean;
  isBlocked: boolean;
  onPress: (level: Level) => void;
}

const LevelBlockComponent = ({
  level,
  isCurrentLevel,
  isCompleted,
  isBlocked,
  onPress,
}: LevelBlockProps) => {
  const {play} = useSound();

  const handlePress = () => {
    if (!isBlocked) {
      onPress(level);
    }
  };
  const onPressIn = () => {
    play(SOUNDS.BUTTON_CLICK);
  };
  return (
    <TouchableOpacity
      style={[
        styles.levelBox,
        isCurrentLevel && styles.currentLevelBox,
        isCompleted && styles.completedLevelBox,
        isBlocked && styles.loweredOpacity,
      ]}
      onPressIn={onPressIn}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isBlocked}>
      <View style={styles.levelContent}>
        <EQText style={styles.levelNumber}>{level.id}</EQText>
        <View style={styles.levelInfo}>
          <EQText style={styles.gridSize}>
            {level.gridSize}x{level.gridSize}
          </EQText>
        </View>
        {isBlocked && (
          <View style={styles.lockedIndicator}>
            <FontAwesome6 name="lock" size={12} color={colors.white} />
          </View>
        )}
        {!isBlocked && isCurrentLevel && (
          <View style={styles.currentIndicator}>
            <FontAwesome6 name="play" size={12} color={colors.white} />
          </View>
        )}
        {!isBlocked && isCompleted && (
          <View style={styles.completedIndicator}>
            <FontAwesome6 name="check" size={12} color={colors.white} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const LevelBlock = memo(LevelBlockComponent);

const styles = StyleSheet.create({
  levelBox: {
    width: '24.0%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: colors.darkBorder,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 4,
    marginRight: '1%',
    minHeight: 80,
    minWidth: 80,
  },
  currentLevelBox: {
    borderColor: colors.yellow,
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
  },
  completedLevelBox: {
    borderColor: colors.success,
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  blockedLevelBox: {
    borderColor: colors.darkBorder,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  loweredOpacity: {
    opacity: 0.5,
  },
  levelContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 8,
  },
  levelNumber: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  levelInfo: {
    alignItems: 'center',
  },
  gridSize: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
  },
  difficulty: {
    fontSize: 9,
    fontFamily: fonts.regular,
    color: colors.white,
    opacity: 0.6,
    textTransform: 'capitalize',
  },
  currentIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.yellow,
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.success,
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
