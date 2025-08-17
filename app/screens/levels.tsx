import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useAppNavigation} from '../hooks/useAppNavigation';
import CoinSvg from '../components/CoinSvg';

export const LevelsScreen = () => {
  const navigation = useAppNavigation();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLevelPress = (level: any) => {
    console.log(`Level pressed: ${level.id}`);
    // Navigate to game with selected level
    navigation.navigate('game', {levelId: level.id});
  };

  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  // Sample level data - in a real app this would come from a backend or context
  const levels = [
    // Beginner levels
    {
      id: 1,
      name: 'Level 1',
      difficulty: 'beginner',
      status: 'completed',
      stars: 3,
      coins: 50,
      time: '00:45',
      gridSize: '4x4',
    },
    {
      id: 2,
      name: 'Level 2',
      difficulty: 'beginner',
      status: 'completed',
      stars: 2,
      coins: 45,
      time: '01:12',
      gridSize: '4x4',
    },
    {
      id: 3,
      name: 'Level 3',
      difficulty: 'beginner',
      status: 'completed',
      stars: 3,
      coins: 60,
      time: '00:38',
      gridSize: '4x4',
    },
    {
      id: 4,
      name: 'Level 4',
      difficulty: 'beginner',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '5x5',
    },
    {
      id: 5,
      name: 'Level 5',
      difficulty: 'beginner',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '5x5',
    },

    // Intermediate levels
    {
      id: 6,
      name: 'Level 6',
      difficulty: 'intermediate',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '5x5',
    },
    {
      id: 7,
      name: 'Level 7',
      difficulty: 'intermediate',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '5x5',
    },
    {
      id: 8,
      name: 'Level 8',
      difficulty: 'intermediate',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '6x6',
    },

    // Advanced levels
    {
      id: 9,
      name: 'Level 9',
      difficulty: 'advanced',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '6x6',
    },
    {
      id: 10,
      name: 'Level 10',
      difficulty: 'advanced',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '6x6',
    },
    {
      id: 11,
      name: 'Level 11',
      difficulty: 'advanced',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '7x7',
    },
    {
      id: 12,
      name: 'Level 12',
      difficulty: 'advanced',
      status: 'locked',
      stars: 0,
      coins: 0,
      time: '--:--',
      gridSize: '7x7',
    },
  ];

  const filteredLevels =
    selectedDifficulty === 'all'
      ? levels
      : levels.filter(level => level.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.gray;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'seedling';
      case 'intermediate':
        return 'fire';
      case 'advanced':
        return 'crown';
      default:
        return 'circle';
    }
  };

  const renderStars = (stars: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3].map(star => (
          <FontAwesome6
            key={star}
            name={star <= stars ? 'star' : 'star-o'}
            size={12}
            color={star <= stars ? colors.yellow : colors.gray}
            style={styles.star}
          />
        ))}
      </View>
    );
  };

  const renderLevelCard = (level: any) => {
    const isLocked = level.status === 'locked';
    const isCompleted = level.status === 'completed';

    return (
      <TouchableOpacity
        key={level.id}
        style={[styles.levelCard, isLocked && styles.lockedCard]}
        onPress={() => !isLocked && handleLevelPress(level)}
        disabled={isLocked}>
        <LinearGradient
          style={styles.levelGradient}
          colors={
            isLocked
              ? ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
              : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.levelHeader}>
            <View style={styles.levelInfo}>
              <EQText style={[styles.levelName, isLocked && styles.lockedText]}>
                {level.name}
              </EQText>
              <View style={styles.levelMeta}>
                <View
                  style={[
                    styles.difficultyBadge,
                    {backgroundColor: getDifficultyColor(level.difficulty)},
                  ]}>
                  <FontAwesome6
                    name={getDifficultyIcon(level.difficulty)}
                    size={10}
                    color={colors.white}
                  />
                  <EQText style={styles.difficultyText}>
                    {level.difficulty.charAt(0).toUpperCase() +
                      level.difficulty.slice(1)}
                  </EQText>
                </View>
                <EQText
                  style={[styles.gridSize, isLocked && styles.lockedText]}>
                  {level.gridSize}
                </EQText>
              </View>
            </View>

            {isLocked ? (
              <View style={styles.lockIcon}>
                <FontAwesome6 name="lock" size={20} color={colors.gray} />
              </View>
            ) : (
              <View style={styles.levelStats}>
                {renderStars(level.stars)}
                <View style={styles.coinReward}>
                  <CoinSvg width={16} height={16} />
                  <EQText style={styles.coinText}>{level.coins}</EQText>
                </View>
              </View>
            )}
          </View>

          {!isLocked && (
            <View style={styles.levelFooter}>
              <View style={styles.timeContainer}>
                <FontAwesome6 name="clock" size={12} color={colors.purple} />
                <EQText style={styles.timeText}>{level.time}</EQText>
              </View>
              {isCompleted && (
                <View style={styles.completedBadge}>
                  <FontAwesome6
                    name="check-circle"
                    size={16}
                    color={colors.success}
                  />
                  <EQText style={styles.completedText}>Completed</EQText>
                </View>
              )}
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
        <EQText style={styles.headerTitle}>Levels</EQText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Overview */}
        <View style={styles.progressSection}>
          <EQText style={styles.sectionTitle}>Progress Overview</EQText>
          <View style={styles.progressContainer}>
            <LinearGradient
              style={styles.progressCard}
              colors={[
                'rgba(255, 255, 255, 0.15)',
                'rgba(255, 255, 255, 0.05)',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.progressContent}>
                <View style={styles.progressItem}>
                  <EQText style={styles.progressNumber}>3</EQText>
                  <EQText style={styles.progressLabel}>Completed</EQText>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <EQText style={styles.progressNumber}>9</EQText>
                  <EQText style={styles.progressLabel}>Remaining</EQText>
                </View>
                <View style={styles.progressDivider} />
                <View style={styles.progressItem}>
                  <EQText style={styles.progressNumber}>155</EQText>
                  <EQText style={styles.progressLabel}>Total Coins</EQText>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterSection}>
          <EQText style={styles.sectionTitle}>Filter by Difficulty</EQText>
          <View style={styles.filterContainer}>
            {['all', 'beginner', 'intermediate', 'advanced'].map(difficulty => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.filterButton,
                  selectedDifficulty === difficulty &&
                    styles.filterButtonActive,
                ]}
                onPress={() => handleDifficultyFilter(difficulty)}>
                <EQText
                  style={[
                    styles.filterButtonText,
                    selectedDifficulty === difficulty &&
                      styles.filterButtonTextActive,
                  ]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </EQText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Levels Grid */}
        <View style={styles.levelsSection}>
          <EQText style={styles.sectionTitle}>Available Levels</EQText>
          <View style={styles.levelsGrid}>
            {filteredLevels.map(renderLevelCard)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressCard: {
    borderRadius: 12,
    padding: 20,
    minHeight: 80,
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.yellow,
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
  },
  progressDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterSection: {
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterButtonActive: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  levelsSection: {
    marginVertical: 20,
    marginBottom: 40,
  },
  levelsGrid: {
    gap: 15,
  },
  levelCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  lockedCard: {
    opacity: 0.6,
  },
  levelGradient: {
    padding: 20,
    minHeight: 100,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  levelInfo: {
    flex: 1,
  },
  levelName: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 8,
  },
  lockedText: {
    color: colors.gray,
  },
  levelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  gridSize: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.purple,
    backgroundColor: 'rgba(199, 132, 252, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockIcon: {
    padding: 10,
  },
  levelStats: {
    alignItems: 'flex-end',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    marginRight: 2,
  },
  coinReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  coinText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.yellow,
  },
  levelFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  completedText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.success,
  },
});
