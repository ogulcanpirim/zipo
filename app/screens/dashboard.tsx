import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
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
import {LevelWrap} from '../components/LevelWrap';

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
    <ImageBackground
      style={styles.wrapper}
      source={require('../assets/images/background.png')}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.howToPlayButton}
            activeOpacity={0.7}
            onPress={handleHowToPlay}>
            <EQText style={styles.howToPlayText}>How to Play</EQText>
          </TouchableOpacity>
          <View style={styles.wrapContainer}>
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
            <EQText style={styles.introSubtitle}>
              Solve puzzles, unlock levels, and collect coins in this addictive
              puzzle game
            </EQText>
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
            {/* <CoinFarmerContainer
              onCollect={amount => {
                console.log(`Collected ${amount} coins`);
              }}
              onCollectDouble={amount => {
                console.log(`Collected ${amount} coins (2x)`);
              }}
            /> */}
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
  wrapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
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
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
