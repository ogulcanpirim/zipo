import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const AchievementsScreen = () => {
  const navigation = useAppNavigation();
  const progressAnimation = React.useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Play your first game',
      icon: '🎯',
      unlocked: true,
      progress: 1,
      total: 1,
      category: 'beginner',
    },
    {
      id: '2',
      title: 'Rising Star',
      description: 'Reach level 5',
      icon: '⭐',
      unlocked: true,
      progress: 5,
      total: 5,
      category: 'progress',
    },
    {
      id: '3',
      title: 'Math Warrior',
      description: 'Reach level 10',
      icon: '⚔️',
      unlocked: false,
      progress: 6,
      total: 10,
      category: 'progress',
    },
    {
      id: '4',
      title: 'Speed Demon',
      description: 'Complete 10 games in under 2 minutes each',
      icon: '⚡',
      unlocked: false,
      progress: 3,
      total: 10,
      category: 'speed',
    },
    {
      id: '5',
      title: 'Perfect Score',
      description: 'Get 100% accuracy in 5 consecutive games',
      icon: '💯',
      unlocked: true,
      progress: 5,
      total: 5,
      category: 'accuracy',
    },
    {
      id: '6',
      title: 'Marathon Runner',
      description: 'Play 50 games in a single day',
      icon: '🏃',
      unlocked: false,
      progress: 23,
      total: 50,
      category: 'endurance',
    },
    {
      id: '7',
      title: 'Social Butterfly',
      description: 'Share your score 10 times',
      icon: '🦋',
      unlocked: false,
      progress: 7,
      total: 10,
      category: 'social',
    },
    {
      id: '8',
      title: 'Night Owl',
      description: 'Play 5 games after 10 PM',
      icon: '🦉',
      unlocked: true,
      progress: 5,
      total: 5,
      category: 'time',
    },
    {
      id: '9',
      title: 'Early Bird',
      description: 'Play 5 games before 8 AM',
      icon: '🐦',
      unlocked: false,
      progress: 2,
      total: 5,
      category: 'time',
    },
  ];

  const categories = [
    {id: 'all', name: 'All', icon: '🏆'},
    {id: 'beginner', name: 'Beginner', icon: '🎯'},
    {id: 'progress', name: 'Progress', icon: '📈'},
    {id: 'speed', name: 'Speed', icon: '⚡'},
    {id: 'accuracy', name: 'Accuracy', icon: '🎯'},
    {id: 'endurance', name: 'Endurance', icon: '🏃'},
    {id: 'social', name: 'Social', icon: '🦋'},
    {id: 'time', name: 'Time', icon: '⏰'},
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter(
          achievement => achievement.category === selectedCategory,
        );

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  React.useEffect(() => {
    const progressPercentage = (unlockedCount / totalCount) * 100;
    Animated.timing(progressAnimation, {
      toValue: progressPercentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progressAnimation, unlockedCount, totalCount]);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.black]}
      start={{x: 0, y: 0}}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesome6 name="chevron-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <EQText style={styles.headerTitle}>Achievements</EQText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          style={styles.progressCard}
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.progressHeader}>
            <FontAwesome6
              name="trophy"
              size={24}
              color={colors.yellow}
              style={styles.progressIcon}
            />
            <EQText style={styles.progressTitle}>Progress Overview</EQText>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <EQText style={styles.progressNumber}>{unlockedCount}</EQText>
              <EQText style={styles.progressLabel}>Unlocked</EQText>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <EQText style={styles.progressNumber}>{totalCount}</EQText>
              <EQText style={styles.progressLabel}>Total</EQText>
            </View>
            <View style={styles.progressDivider} />
            <View style={styles.progressStat}>
              <EQText style={styles.progressNumber}>
                {Math.round((unlockedCount / totalCount) * 100)}%
              </EQText>
              <EQText style={styles.progressLabel}>Complete</EQText>
            </View>
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </LinearGradient>
        <View style={styles.categoryContainer}>
          <EQText style={styles.categoryTitle}>Categories</EQText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                <EQText style={styles.categoryIcon}>{category.icon}</EQText>
                <EQText
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id &&
                      styles.categoryTextActive,
                  ]}>
                  {category.name}
                </EQText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.achievementsContainer}>
          <EQText style={styles.achievementsTitle}>
            {selectedCategory === 'all'
              ? 'All Achievements'
              : categories.find(c => c.id === selectedCategory)?.name}{' '}
            ({filteredAchievements.length})
          </EQText>

          {filteredAchievements.map(achievement => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                achievement.unlocked
                  ? styles.achievementCardUnlocked
                  : styles.achievementCardLocked,
              ]}>
              <View style={styles.achievementContent}>
                <View style={styles.achievementIconContainer}>
                  <EQText style={styles.achievementIcon}>
                    {achievement.icon}
                  </EQText>
                </View>
                <View style={styles.achievementTextContainer}>
                  <EQText
                    style={[
                      styles.achievementTitle,
                      achievement.unlocked
                        ? styles.achievementTitleUnlocked
                        : styles.achievementTitleLocked,
                    ]}>
                    {achievement.title}
                  </EQText>
                  <EQText
                    style={[
                      styles.achievementDescription,
                      achievement.unlocked
                        ? styles.achievementDescriptionUnlocked
                        : styles.achievementDescriptionLocked,
                    ]}>
                    {achievement.description}
                  </EQText>
                  {!achievement.unlocked && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBarSmall}>
                        <View
                          style={[
                            styles.progressFillSmall,
                            {
                              width: `${
                                (achievement.progress / achievement.total) * 100
                              }%`,
                            },
                          ]}
                        />
                      </View>
                      <EQText style={styles.progressText}>
                        {achievement.progress}/{achievement.total}
                      </EQText>
                    </View>
                  )}
                </View>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <FontAwesome6 name="check" size={12} color={colors.white} />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 75,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressIcon: {
    marginRight: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressStat: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
  },
  progressDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: 4,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonActive: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  categoryTextActive: {
    color: colors.black,
  },
  achievementsContainer: {
    marginBottom: 30,
  },
  achievementsTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 16,
  },
  achievementCard: {
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  achievementCardUnlocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  achievementCardLocked: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  achievementIconContainer: {
    marginRight: 12,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementTextContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 4,
  },
  achievementTitleUnlocked: {
    color: colors.white,
  },
  achievementTitleLocked: {
    color: colors.gray,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: fonts.medium,
    marginBottom: 8,
  },
  achievementDescriptionUnlocked: {
    color: colors.white,
  },
  achievementDescriptionLocked: {
    color: colors.gray,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarSmall: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: colors.yellow,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
  },
  unlockedBadge: {
    backgroundColor: colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
