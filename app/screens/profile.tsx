import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {EQText} from '../components/EQText';
import {PremiumModal} from '../components/PremiumModal';
import {ProfileStatsCard} from '../components/ProfileStatsCard';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useBottomSheet} from '../hooks/useBottomsheet';
import {SCREENS} from '../navigation/screens';

export const ProfileScreen = () => {
  const navigation = useAppNavigation();
  const {expand} = useBottomSheet();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSeeAllAchievements = () => {
    navigation.navigate(SCREENS.ACHIEVEMENTS);
  };

  const openPremiumModal = () => {
    expand({
      content: <PremiumModal />,
      snapPoints: ['90%'],
      enablePanDownToClose: true,
      pressBehavior: 'close',
    });
  };

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Play your first game',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Rising Star',
      description: 'Reach level 5',
      icon: '⭐',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Math Warrior',
      description: 'Reach level 10',
      icon: '⚔️',
      unlocked: false,
    },
  ];

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.black]}
      start={{x: 0, y: 0}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <FontAwesome6Icon
            name="chevron-left"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
        <EQText style={styles.headerTitle}>Profile</EQText>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          style={styles.profileCard}
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <EQText style={styles.avatarIcon}>🧮</EQText>
            </View>
          </View>
          <EQText style={styles.username}>Math Explorer</EQText>
          <View style={styles.badgeContainer}>
            <EQText style={styles.badgeText}>Free Player</EQText>
          </View>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={openPremiumModal}>
            <EQText style={styles.upgradeButtonText}>Upgrade to Premium</EQText>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.statsContainer}>
          <ProfileStatsCard icon="bullseye" value="6" label="Highest Level" />
          <ProfileStatsCard
            icon="star"
            value="11,421,250"
            label="Total Score"
          />
          <ProfileStatsCard icon="clock" value="76,141" label="Games Played" />
          <ProfileStatsCard icon="trophy" value="5" label="Trophies" />
        </View>
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementsHeader}>
            <View style={styles.achievementsHeaderLeft}>
              <FontAwesome6Icon
                name="trophy"
                size={20}
                color={colors.white}
                style={styles.achievementsHeaderIcon}
              />
              <EQText style={styles.achievementsHeaderTitle}>
                Achievements (5/9)
              </EQText>
            </View>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={handleSeeAllAchievements}>
              <EQText style={styles.seeAllText}>See All</EQText>
            </TouchableOpacity>
          </View>

          {achievements.map(achievement => (
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
                </View>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <EQText style={styles.unlockedBadgeText}>Unlocked</EQText>
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
  backIcon: {
    fontSize: 24,
    color: colors.white,
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
  profileCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarIcon: {
    fontSize: 20,
  },
  username: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 10,
  },
  badgeContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    transform: [{scale: 0.85}],
  },
  badgeText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  achievementsContainer: {
    marginBottom: 30,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  achievementsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementsHeaderIcon: {
    marginRight: 10,
    fontSize: 20,
  },
  achievementsHeaderTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  seeAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    opacity: 0.8,
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
  },
  achievementDescriptionUnlocked: {
    color: colors.white,
  },
  achievementDescriptionLocked: {
    color: colors.gray,
  },
  unlockedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unlockedBadgeText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  upgradeButton: {
    backgroundColor: colors.premiumOrange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
});
