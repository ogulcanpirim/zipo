import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface Player {
  id: string;
  name: string;
  rank: number;
  level: number;
  score: string;
  date: string;
  hasCrown: boolean;
  trophyType: 'gold' | 'silver' | 'bronze' | 'none';
}

export const LeaderboardScreen = () => {
  const navigation = useAppNavigation();
  const [selectedTab, setSelectedTab] = useState<'global' | 'daily'>('global');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const currentUserGlobal = {
    name: 'You',
    rank: 1,
    level: 6,
    score: '11,421,250',
  };

  const currentUserDaily = {
    name: 'You',
    rank: 3,
    level: 6,
    score: '2,450',
  };

  const topPlayersGlobal: Player[] = [
    {
      id: '1',
      name: 'MathWizard',
      rank: 1,
      level: 25,
      score: '15,420',
      date: '8/4/2025',
      hasCrown: true,
      trophyType: 'gold',
    },
    {
      id: '2',
      name: 'NumberNinja',
      rank: 2,
      level: 22,
      score: '12,890',
      date: '8/4/2025',
      hasCrown: false,
      trophyType: 'silver',
    },
    {
      id: '3',
      name: 'EquationMaster',
      rank: 3,
      level: 20,
      score: '11,750',
      date: '8/4/2025',
      hasCrown: true,
      trophyType: 'bronze',
    },
    {
      id: '4',
      name: 'CalcKing',
      rank: 4,
      level: 18,
      score: '9,980',
      date: '8/4/2025',
      hasCrown: false,
      trophyType: 'none',
    },
    {
      id: '5',
      name: 'AlgebraAce',
      rank: 5,
      level: 16,
      score: '8,760',
      date: '8/4/2025',
      hasCrown: true,
      trophyType: 'none',
    },
  ];

  const topPlayersDaily: Player[] = [
    {
      id: 'daily1',
      name: 'QuickSolver',
      rank: 1,
      level: 18,
      score: '3,250',
      date: 'Today',
      hasCrown: true,
      trophyType: 'gold',
    },
    {
      id: 'daily2',
      name: 'SpeedRunner',
      rank: 2,
      level: 15,
      score: '2,890',
      date: 'Today',
      hasCrown: false,
      trophyType: 'silver',
    },
    {
      id: 'daily3',
      name: 'You',
      rank: 3,
      level: 6,
      score: '2,450',
      date: 'Today',
      hasCrown: false,
      trophyType: 'bronze',
    },
    {
      id: 'daily4',
      name: 'MathWhiz',
      rank: 4,
      level: 12,
      score: '2,120',
      date: 'Today',
      hasCrown: true,
      trophyType: 'none',
    },
    {
      id: 'daily5',
      name: 'FastCalc',
      rank: 5,
      level: 9,
      score: '1,980',
      date: 'Today',
      hasCrown: false,
      trophyType: 'none',
    },
  ];

  const getTrophyIcon = (type: 'gold' | 'silver' | 'bronze' | 'none') => {
    switch (type) {
      case 'gold':
        return '🏆';
      case 'silver':
        return '🥈';
      case 'bronze':
        return '🥉';
      default:
        return null;
    }
  };

  const getCurrentUser = () => {
    return selectedTab === 'global' ? currentUserGlobal : currentUserDaily;
  };

  const getTopPlayers = () => {
    return selectedTab === 'global' ? topPlayersGlobal : topPlayersDaily;
  };

  const getTabTitle = () => {
    return selectedTab === 'global' ? 'Top Players' : "Today's Leaders";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <FontAwesome6 name="chevron-left" size={24} color={colors.white} />
        </TouchableOpacity>
        <EQText style={styles.headerTitle}>Leaderboard</EQText>
        <View style={styles.headerSpacer} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'global' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('global')}>
          <FontAwesome6
            name="trophy"
            size={16}
            color={selectedTab === 'global' ? colors.yellow : colors.white}
            style={styles.tabIcon}
          />
          <EQText
            style={[
              styles.tabText,
              selectedTab === 'global' && styles.activeTabText,
            ]}>
            Global
          </EQText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'daily' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('daily')}>
          <FontAwesome6
            name="calendar"
            size={16}
            color={selectedTab === 'daily' ? colors.yellow : colors.white}
            style={styles.tabIcon}
          />
          <EQText
            style={[
              styles.tabText,
              selectedTab === 'daily' && styles.activeTabText,
            ]}>
            Daily
          </EQText>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.userRankContainer}>
          <LinearGradient
            style={styles.userRankCard}
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.userAvatarContainer}>
              <View style={styles.userAvatar}>
                <EQText style={styles.userAvatarText}>🧮</EQText>
              </View>
            </View>
            <View style={styles.userInfoContainer}>
              <EQText style={styles.userName}>{getCurrentUser().name}</EQText>
              <EQText style={styles.userRank}>
                Rank #{getCurrentUser().rank}
              </EQText>
            </View>
            <View style={styles.userScoreContainer}>
              <EQText style={styles.userScore}>{getCurrentUser().score}</EQText>
              <EQText style={styles.userLevel}>
                Level {getCurrentUser().level}
              </EQText>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.topPlayersContainer}>
          <LinearGradient
            style={styles.topPlayersCard}
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={styles.topPlayersHeader}>
              <FontAwesome6
                name="trophy"
                size={20}
                color={colors.yellow}
                style={styles.trophyIcon}
              />
              <EQText style={styles.topPlayersTitle}>{getTabTitle()}</EQText>
            </View>
            <ScrollView
              style={styles.playersList}
              showsVerticalScrollIndicator={true}
              indicatorStyle="white">
              {getTopPlayers().map((player, _index) => (
                <View key={player.id} style={styles.playerRow}>
                  <View style={styles.playerRankContainer}>
                    {player.trophyType !== 'none' ? (
                      <EQText style={styles.trophyEmoji}>
                        {getTrophyIcon(player.trophyType)}
                      </EQText>
                    ) : (
                      <EQText style={styles.rankNumber}>#{player.rank}</EQText>
                    )}
                  </View>
                  <View style={styles.playerInfoContainer}>
                    <View style={styles.playerNameContainer}>
                      <EQText style={styles.playerName}>{player.name}</EQText>
                      {player.hasCrown && (
                        <FontAwesome6
                          name="crown"
                          size={12}
                          color={colors.yellow}
                          style={styles.crownIcon}
                        />
                      )}
                    </View>
                    <EQText style={styles.playerLevel}>
                      Level {player.level}
                    </EQText>
                  </View>
                  <View style={styles.playerScoreContainer}>
                    <EQText style={styles.playerScore}>{player.score}</EQText>
                    <EQText style={styles.playerDate}>{player.date}</EQText>
                  </View>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  activeTabText: {
    color: colors.purple,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 12,
  },
  userRankContainer: {
    marginBottom: 20,
  },
  userRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  userAvatarContainer: {
    marginRight: 15,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 24,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  userRank: {
    fontSize: 14,
    color: colors.white,
  },
  userScoreContainer: {
    alignItems: 'flex-end',
  },
  userScore: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 12,
    color: colors.white,
  },
  topPlayersContainer: {
    marginBottom: 20,
  },
  topPlayersCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  topPlayersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  trophyIcon: {
    marginRight: 10,
  },
  topPlayersTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  playersList: {
    maxHeight: 400,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  playerRankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  rankNumber: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  trophyEmoji: {
    fontSize: 20,
  },
  playerInfoContainer: {
    flex: 1,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.white,
    marginRight: 8,
  },
  crownIcon: {
    marginLeft: 4,
  },
  playerLevel: {
    fontSize: 12,
    color: colors.white,
  },
  playerScoreContainer: {
    alignItems: 'flex-end',
  },
  playerScore: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    marginBottom: 4,
  },
  playerDate: {
    fontSize: 10,
    color: colors.white,
  },
});
