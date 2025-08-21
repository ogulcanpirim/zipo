import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CoinWrap} from '../components/CoinWrap';
import {EQText} from '../components/EQText';
import {HowToPlayModal} from '../components/HowToPlayModal';
import {Pressable} from '../components/Pressable';
import {StartButton} from '../components/StartButton';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useBottomSheet} from '../hooks/useBottomsheet';
import {SOUNDS} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {getCurrentLevel} from '../utils/helpers';

export const DashboardScreen = () => {
  const navigation = useAppNavigation();
  const {expand} = useBottomSheet();

  const handleLevelsPress = () => {
    navigation.navigate(SCREENS.LEVEL_ENTRANCE);
  };

  const handleMarketplacePress = () => {
    navigation.navigate(SCREENS.MARKETPLACE);
  };

  const handleThemePress = () => {
    navigation.navigate(SCREENS.THEMES);
  };

  const startGame = () => {
    const level = getCurrentLevel();
    navigation.navigate(SCREENS.GAME, {level});
  };

  const handleHowToPlay = () => {
    expand({
      content: <HowToPlayModal />,
      snapPoints: [300],
      enablePanDownToClose: true,
      pressBehavior: 'close',
    });
  };

  const handleDevMode = () => {
    navigation.navigate(SCREENS.DEV_MODE);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.howToPlayButton}
          activeOpacity={0.7}
          onPress={handleHowToPlay}>
          <EQText style={styles.howToPlayText}>How to Play</EQText>
        </TouchableOpacity>
        <CoinWrap />
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/app_logo.png')}
              style={styles.logo}
            />
          </View>
          <EQText style={styles.appName}>Zipo</EQText>
        </View>
        <View style={styles.startGameContainer}>
          <StartButton startGame={startGame} />
        </View>
        <View style={styles.additionalSectionsContainer}>
          <Pressable
            style={styles.sectionCard}
            onPress={handleLevelsPress}
            sound={SOUNDS.BUTTON_CLICK}>
            <LinearGradient
              style={styles.sectionGradient}
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.sectionContent}>
                <FontAwesome6
                  name="layer-group"
                  size={20}
                  color={colors.white}
                  style={styles.sectionIcon}
                />
                <EQText style={styles.sectionText}>Levels</EQText>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.sectionCard}
            onPress={handleMarketplacePress}
            sound={SOUNDS.BUTTON_CLICK}>
            <LinearGradient
              style={styles.sectionGradient}
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.sectionContent}>
                <FontAwesome6
                  name="store"
                  size={20}
                  color={colors.white}
                  style={styles.sectionIcon}
                />
                <EQText style={styles.sectionText}>Marketplace</EQText>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.sectionCard}
            onPress={handleThemePress}
            sound={SOUNDS.BUTTON_CLICK}>
            <LinearGradient
              style={styles.sectionGradient}
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.sectionContent}>
                <FontAwesome6
                  name="palette"
                  size={20}
                  color={colors.white}
                  style={styles.sectionIcon}
                />
                <EQText style={styles.sectionText}>Themes</EQText>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            style={styles.sectionCard}
            onPress={handleDevMode}
            sound={SOUNDS.BUTTON_CLICK}>
            <LinearGradient
              style={styles.sectionGradient}
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.sectionContent}>
                <FontAwesome6
                  name="magnifying-glass-chart"
                  size={20}
                  color={colors.white}
                  style={styles.sectionIcon}
                />
                <EQText style={styles.sectionText}>DEV Mode</EQText>
              </View>
            </LinearGradient>
          </Pressable>
          <TouchableOpacity style={styles.achievementCard}>
            <LinearGradient
              style={styles.achievementGradient}
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <View style={styles.achievementContent}>
                <FontAwesome6
                  name="trophy"
                  size={36}
                  color={colors.yellow}
                  style={styles.achievementIcon}
                />
                <EQText style={styles.achievementTitle}>
                  Latest Achievement
                </EQText>
                <EQText style={styles.achievementSubtitle}>
                  Score Champion
                </EQText>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    paddingTop: 75,
    width: '100%',
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  howToPlayButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
  },
  howToPlayText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.medium,
  },
  scroll: {
    flex: 1,
    width: '100%',
    paddingTop: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 8,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  appName: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 5,
    textAlign: 'center',
  },
  startGameContainer: {
    marginTop: 20,
  },
  startGameButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  startGameGradient: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  startGameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginRight: 10,
  },
  startGameText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  additionalSectionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  sectionCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  sectionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionIcon: {
    marginRight: 15,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
  achievementCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  achievementGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  achievementContent: {
    alignItems: 'center',
  },
  achievementIcon: {
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 5,
    textAlign: 'center',
  },
  achievementSubtitle: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
});
