import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CoinSvg from '../components/CoinSvg';
import {EQText} from '../components/EQText';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {Header} from '../components/Header';

export const MarketplaceScreen = () => {
  const handleItemPress = (item: string) => {
    console.log(`Item pressed: ${item}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Marketplace" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Items Section */}
        <View style={styles.section}>
          <EQText style={styles.sectionTitle}>Featured Items</EQText>
          <View style={styles.featuredContainer}>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => handleItemPress('time_freeze')}>
              <LinearGradient
                style={styles.featuredGradient}
                colors={[
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.05)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.featuredContent}>
                  <View style={styles.featuredLeft}>
                    <FontAwesome6
                      name="clock"
                      size={20}
                      color={colors.purple}
                      style={styles.featuredIcon}
                    />
                    <EQText style={styles.featuredTitle}>Time Freeze</EQText>
                  </View>
                  <View style={styles.featuredPriceContainer}>
                    <CoinSvg width={16} height={16} />
                    <EQText style={styles.featuredPrice}>300</EQText>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* Coin Packs Section */}
        <View style={styles.section}>
          <EQText style={styles.sectionTitle}>Coin Packs</EQText>
          <View style={styles.coinPacksContainer}>
            <TouchableOpacity
              style={styles.coinPackCard}
              onPress={() => handleItemPress('coin_pack_1')}>
              <LinearGradient
                style={styles.coinPackGradient}
                colors={[
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.05)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.coinPackContent}>
                  <View style={styles.coinPackLeft}>
                    <View style={styles.coinPackIcons}>
                      <CoinSvg width={24} height={24} />
                    </View>
                    <View style={styles.coinPackInfo}>
                      <EQText style={styles.coinPackAmount}>1,000 Coins</EQText>
                      <EQText style={styles.coinPackBonus}>+100 Bonus</EQText>
                    </View>
                  </View>
                  <EQText style={styles.coinPackPrice}>$0.99</EQText>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.coinPackCard}
              onPress={() => handleItemPress('coin_pack_2')}>
              <LinearGradient
                style={styles.coinPackGradient}
                colors={[
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.05)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.coinPackContent}>
                  <View style={styles.coinPackLeft}>
                    <View style={styles.coinPackIcons}>
                      <CoinSvg width={24} height={24} />
                    </View>
                    <View style={styles.coinPackInfo}>
                      <EQText style={styles.coinPackAmount}>5,000 Coins</EQText>
                      <EQText style={styles.coinPackBonus}>+750 Bonus</EQText>
                    </View>
                  </View>
                  <EQText style={styles.coinPackPrice}>$3.99</EQText>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.coinPackCard}
              onPress={() => handleItemPress('coin_pack_3')}>
              <LinearGradient
                style={styles.coinPackGradient}
                colors={[
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.05)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.coinPackContent}>
                  <View style={styles.coinPackLeft}>
                    <View style={styles.coinPackIcons}>
                      <CoinSvg width={24} height={24} />
                    </View>
                    <View style={styles.coinPackInfo}>
                      <EQText style={styles.coinPackAmount}>
                        15,000 Coins
                      </EQText>
                      <EQText style={styles.coinPackBonus}>+3,000 Bonus</EQText>
                    </View>
                  </View>
                  <EQText style={styles.coinPackPrice}>$9.99</EQText>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.coinPackCard}
              onPress={() => handleItemPress('coin_pack_4')}>
              <LinearGradient
                style={styles.coinPackGradient}
                colors={[
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(255, 255, 255, 0.05)',
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                <View style={styles.coinPackContent}>
                  <View style={styles.coinPackLeft}>
                    <View style={styles.coinPackIcons}>
                      <CoinSvg width={24} height={24} />
                    </View>
                    <View style={styles.coinPackInfo}>
                      <EQText style={styles.coinPackAmount}>
                        50,000 Coins
                      </EQText>
                      <EQText style={styles.coinPackBonus}>
                        +15,000 Bonus
                      </EQText>
                    </View>
                  </View>
                  <EQText style={styles.coinPackPrice}>$24.99</EQText>
                </View>
              </LinearGradient>
            </TouchableOpacity>
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
  section: {
    marginVertical: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    borderRadius: 12,
  },
  categoryGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  categoryIcon: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
  featuredContainer: {
    gap: 15,
  },
  featuredCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredGradient: {
    padding: 20,
    minHeight: 80,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featuredIcon: {
    marginRight: 15,
  },
  featuredTitle: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  featuredPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredPrice: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.yellow,
    marginLeft: 5,
  },
  coinPacksContainer: {
    gap: 15,
  },
  coinPackCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  coinPackGradient: {
    padding: 20,
    minHeight: 80,
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
  coinPackIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
    marginBottom: 2,
  },
  coinGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    gap: 4,
  },
});
