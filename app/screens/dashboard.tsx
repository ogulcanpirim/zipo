import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CoinWrap} from '../components/CoinWrap';
import {EQText} from '../components/EQText';
import {HowToPlayModal} from '../components/HowToPlayModal';
import {LevelWrap} from '../components/LevelWrap';
import {Pressable} from '../components/Pressable';
import {StartButton} from '../components/StartButton';
import TimerWrap from '../components/TimerWrap';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppNavigation} from '../hooks/useAppNavigation';
import {useBottomSheet} from '../hooks/useBottomsheet';
import {SOUNDS} from '../models/game';
import {SCREENS} from '../navigation/screens';
import {DEV_MODE_ENABLED} from '../constants/game';

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

  const handleSettingsPress = () => {
    // TODO: Implement settings navigation or modal
    // navigation.navigate(SCREENS.SETTINGS);
  };

  return (
    <ImageBackground
      style={styles.wrapper}
      source={require('../assets/images/background.png')}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={handleSettingsPress}
            style={styles.settingsButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            sound={SOUNDS.BUTTON_CLICK}>
            <FontAwesome6 name="gear" size={20} color={colors.white} />
          </Pressable>
          <View style={styles.wrapContainer}>
            <TimerWrap />
            <LevelWrap />
            <CoinWrap />
          </View>
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../assets/images/app_logo.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.introSection}>
            <EQText style={styles.introTitle}>Welcome to Zipo</EQText>
            <Pressable
              style={styles.howToPlayButton}
              sound={SOUNDS.BUTTON_CLICK}
              onPress={handleHowToPlay}>
              <EQText style={styles.howToPlayText}>How to Play</EQText>
            </Pressable>
            <EQText style={styles.introSubtitle}>
              Solve puzzles, unlock levels, and collect coins in this addictive
              puzzle game
            </EQText>
          </View>
          <View style={styles.startGameContainer}>
            <StartButton />
          </View>
          <View style={styles.additionalSectionsContainer}>
            <Pressable
              style={styles.sectionCard}
              onPress={handleLevelsPress}
              sound={SOUNDS.BUTTON_CLICK}>
              <LinearGradient
                style={styles.sectionGradient}
                colors={['#4CAF50', '#2E7D32']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
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
                colors={['#FF9800', '#E65100']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
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
                colors={['#F44336', '#B71C1C']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
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
            {DEV_MODE_ENABLED && (
              <Pressable
                style={styles.sectionCard}
                onPress={handleDevMode}
                sound={SOUNDS.BUTTON_CLICK}>
                <LinearGradient
                  style={styles.sectionGradient}
                  colors={['#00BCD4', '#006064']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
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
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 18,
    paddingTop: 75,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingBottom: 10,
  },
  settingsButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: `${colors.white}20`,
  },
  howToPlayButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 12,
  },
  howToPlayText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.medium,
  },
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },
  scroll: {
    flex: 1,
    width: '100%',
    paddingTop: 5,
  },
  timerContainer: {
    position: 'absolute',
    right: 10,
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
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: 'contain',
    zIndex: 0,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
    paddingHorizontal: 20,
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
    marginTop: 15,
  },
  sectionCard: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
  },
  sectionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    borderRadius: 12,
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
});
