import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CoinPack} from '../components/CoinPack';
import CoinSvg from '../components/CoinSvg';
import {EQText} from '../components/EQText';
import {Header} from '../components/Header';
import {Pressable} from '../components/Pressable';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {SOUNDS} from '../models/game';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  formatCoinCount,
  getCoinPacks,
  getCollectorRewardPerHour,
} from '../utils/helpers';

//fdd936, ec4079

function darken(hex: string, percent: number): string {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const MarketplaceScreen = () => {
  const proScale = useSharedValue(1);
  const {currentLevel} = useAppSelector(state => state.userData);

  const coinPacks = useMemo(() => {
    return getCoinPacks(currentLevel);
  }, [currentLevel]);

  const premiumCoin = useMemo(() => {
    return getCollectorRewardPerHour(currentLevel) * 100;
  }, [currentLevel]);

  const handlePremiumPress = () => {};

  const premiumGradientColors = [darken('#FBC12D', 0.2), '#EC4079'];

  proScale.value = withRepeat(
    withSequence(
      withDelay(2000, withSpring(1.04)),
      withSpring(1),
      withSpring(1.02),
      withSpring(1),
    ),
    -1,
  );

  const animatedProContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: proScale.value}],
    };
  });

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.container}>
      <Header title="Marketplace" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Premium Section */}
        <Animated.View style={[styles.section, animatedProContainerStyle]}>
          <View style={styles.premiumCard}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/pro.png')}
                style={styles.image}
              />
            </View>
            <LinearGradient
              style={styles.premiumGradient}
              colors={premiumGradientColors}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View style={styles.premiumContent}>
                <View style={styles.premiumHeader}>
                  <View style={styles.premiumTitleSection}>
                    <EQText style={styles.premiumTitle}>Premium</EQText>
                    <EQText style={styles.premiumSubtitle}>
                      Unlock Everything
                    </EQText>
                  </View>
                </View>
                <View style={styles.premiumFeatures}>
                  <View style={styles.featureRow}>
                    <FontAwesome6
                      name="check-circle"
                      size={16}
                      color={colors.white}
                    />
                    <EQText style={styles.featureText}>No ads</EQText>
                  </View>
                  <View style={styles.featureRow}>
                    <FontAwesome6
                      name="check-circle"
                      size={16}
                      color={colors.white}
                    />
                    <EQText style={styles.featureText}>No banner ads</EQText>
                  </View>
                  <View style={styles.featureRow}>
                    <FontAwesome6
                      name="check-circle"
                      size={16}
                      color={colors.white}
                    />
                    <View style={styles.itemRow}>
                      <CoinSvg width={14} height={14} />
                      <EQText style={styles.featureText}>
                        <EQText style={styles.coin}>
                          {formatCoinCount(premiumCoin)}
                        </EQText>
                        {' reward'}
                      </EQText>
                    </View>
                  </View>
                  <View style={styles.featureRow}>
                    <FontAwesome6
                      name="check-circle"
                      size={16}
                      color={colors.white}
                    />
                    <EQText style={styles.featureText}>
                      2x Idle Income Boost
                    </EQText>
                  </View>
                  <View style={styles.featureRow}>
                    <FontAwesome6
                      name="check-circle"
                      size={16}
                      color={colors.white}
                    />
                    <EQText style={styles.featureText}>
                      Unlimited free clean & undo boards
                    </EQText>
                  </View>
                </View>
                <Pressable
                  sound={SOUNDS.BUTTON_CLICK}
                  style={styles.proButton}
                  onPress={handlePremiumPress}>
                  <LinearGradient
                    colors={['#A8FF78', darken('#009245', 0.2)]}
                    start={{x: 0, y: 0}}
                    style={styles.proButtonGradient}
                    end={{x: 0, y: 1}}>
                    <EQText style={styles.premiumPrice}>₺299.99</EQText>
                  </LinearGradient>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
        {/* Coin Packs Section */}
        <View style={styles.section}>
          <EQText style={styles.sectionTitle}>Coin Packs</EQText>
          <View style={styles.coinPacksContainer}>
            {coinPacks.map(pack => (
              <CoinPack
                key={pack.id}
                id={pack.id}
                coinAmount={pack.coins}
                bonusAmount={pack.bonus}
                price={pack.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  premiumCard: {
    borderRadius: 12,
  },
  imageContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -40,
    zIndex: 100,
  },
  premiumGradient: {
    padding: 20,
    paddingTop: 40,
    borderRadius: 12,
  },
  premiumContent: {
    gap: 12,
  },
  premiumHeader: {
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  premiumTitleSection: {
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  premiumFeatures: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  coin: {
    fontFamily: fonts.bold,
    color: colors.white,
  },
  premiumPriceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
  },
  proButton: {
    alignSelf: 'center',
  },
  proButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  premiumPrice: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.white,
    alignSelf: 'center',
  },
  premiumPeriod: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  coinPacksContainer: {
    gap: 8,
  },
  coinPackCard: {
    width: '100%',
    borderRadius: 12,
  },
  coinPackGradient: {
    padding: 20,
    minHeight: 80,
    borderRadius: 12,
  },
  coinPackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinPackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinPackIcon: {
    marginRight: 15,
  },
  coinPackInfo: {
    marginLeft: 10,
  },
  coinPackAmount: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  coinPackBonus: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  coinPackPrice: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.yellow,
  },
});
