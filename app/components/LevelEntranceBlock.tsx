import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  default as FontAwesome6,
  default as FontAwesome6Icon,
} from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {LevelGroup, SOUNDS} from '../models/game';
import {EQText} from './EQText';
import {Pressable} from './Pressable';

interface LevelEntranceBlockProps {
  item: LevelGroup;
  currentLevel: number;
  handleLevelGroupPress: (group: LevelGroup) => void;
}

const getDifficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case '4x4':
      return '#3570B3';
    case '5x5':
      return '#399E8F';
    case '6x6':
      return '#C97F1A';
    case '7x7':
      return '#990217';
    case '8x8':
      return '#6D0FB7';
    default:
      return colors.gradientEnd;
  }
};

export const LevelEntranceBlock = ({
  item,
  currentLevel,
  handleLevelGroupPress,
}: LevelEntranceBlockProps) => {
  const handlePress = () => {
    handleLevelGroupPress(item);
  };

  const difficultyBadgeStyle = [
    styles.difficultyBadge,
    {backgroundColor: getDifficultyBadgeColor(item.difficulty)},
  ];

  return (
    <Pressable
      style={[
        styles.levelGroupCard,
        !item.isUnlocked && styles.lockedCard,
        item.isCompleted && styles.completedCard,
      ]}
      sound={SOUNDS.BUTTON_CLICK}
      onPress={handlePress}
      disabled={!item.isUnlocked}
      activeOpacity={0.7}>
      <View
        style={[
          styles.cardGradient,
          item.isCompleted && styles.completedBackground,
        ]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleSection}>
            <EQText style={styles.groupTitle}>{item.title}</EQText>
            <EQText style={styles.levelRange}>
              Levels {item.startLevel} - {item.endLevel}
            </EQText>
          </View>
          <View style={styles.cardStats}>
            <View style={difficultyBadgeStyle}>
              <EQText style={styles.difficultyText}>{item.difficulty}</EQText>
            </View>
          </View>
        </View>
        <View style={styles.cardFooter}>
          {item.isUnlocked && (
            <View style={styles.progressIndicator}>
              <EQText style={styles.progressText}>
                {Math.min(currentLevel, item.endLevel) - item.startLevel + 1} /{' '}
                {item.endLevel - item.startLevel + 1}
              </EQText>
            </View>
          )}
          {item.isCompleted && (
            <View style={styles.completedIndicator}>
              <FontAwesome6
                name="check-circle"
                size={16}
                color={colors.success}
              />
              <EQText style={styles.completedText}>Completed</EQText>
            </View>
          )}
          {!item.isUnlocked && (
            <View style={styles.lockedIndicator}>
              <FontAwesome6Icon name="lock" size={14} color={colors.gray} />
              <EQText style={styles.lockedText}>Locked</EQText>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  levelGroupCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  lockedCard: {
    borderColor: colors.darkBorder,
    opacity: 0.6,
  },
  completedCard: {
    borderColor: colors.success,
  },
  completedBackground: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  cardGradient: {
    padding: 15,
    minHeight: 80,
    backgroundColor: colors.darkCard,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitleSection: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
    marginBottom: 3,
  },
  levelRange: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  cardStats: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    // backgroundColor will be set dynamically
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  cardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  completedText: {
    fontSize: 11,
    color: colors.success,
    fontFamily: fonts.medium,
    marginLeft: 6,
  },
  lockedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(189, 195, 199, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  lockedText: {
    fontSize: 11,
    color: colors.gray,
    fontFamily: fonts.medium,
    marginLeft: 6,
  },
  progressIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 11,
    color: colors.white,
    fontFamily: fonts.semiBold,
  },
});
