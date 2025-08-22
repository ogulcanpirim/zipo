import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {useAppSelector} from '../hooks/useAppSelector';
import {useSound} from '../hooks/useSound';
import {SOUNDS} from '../models/game';
import {formatCoinCount} from '../utils/helpers';
import {EQText} from './EQText';
import {Pressable} from './Pressable';
import CoinSvg from './CoinSvg';

interface CoinFarmerContainerProps {
  onCollect?: (amount: number) => void;
  onCollectDouble?: (amount: number) => void;
}

export const CoinFarmerContainer: React.FC<CoinFarmerContainerProps> = ({
  onCollect,
  onCollectDouble,
}) => {
  const {play} = useSound();
  const currentLevel = useAppSelector(state => state.userData.currentLevel);
  const [storedCoins, setStoredCoins] = useState(0);
  const [maxStorage, setMaxStorage] = useState(100);

  // Animation values for coin collection
  const coinScale = useSharedValue(1);
  const coinRotation = useSharedValue(0);

  const farmingRate = Math.max(1, Math.floor(currentLevel / 5) + 1);

  const calculateMaxStorage = () => {
    return Math.max(100, currentLevel * 50);
  };

  useEffect(() => {
    setMaxStorage(calculateMaxStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  // Farming effect - adds coins every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setStoredCoins(prev => {
        const newAmount = prev + farmingRate;
        return Math.min(newAmount, maxStorage);
      });
    }, 3600000); // Farm every hour (3600000ms = 1 hour)

    return () => clearInterval(interval);
  }, [farmingRate, maxStorage]);

  // Animated styles for coin
  const coinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: coinScale.value}, {rotate: `${coinRotation.value}deg`}],
  }));

  const triggerCoinAnimation = () => {
    coinScale.value = withSequence(
      withSpring(1.2, {duration: 200}),
      withSpring(1, {duration: 200}),
    );
    coinRotation.value = withSequence(
      withTiming(15, {duration: 100}),
      withTiming(-15, {duration: 100}),
      withTiming(0, {duration: 100}),
    );
  };

  const handleCollect = () => {
    if (storedCoins > 0) {
      play(SOUNDS.BUTTON_CLICK);
      triggerCoinAnimation();
      onCollect?.(storedCoins);
      setStoredCoins(0);
    }
  };

  const handleCollectDouble = () => {
    if (storedCoins > 0) {
      play(SOUNDS.BUTTON_CLICK);
      triggerCoinAnimation();
      onCollectDouble?.(storedCoins * 2);
      setStoredCoins(0);
    }
  };

  const storagePercentage = (storedCoins / maxStorage) * 100;

  return (
    <View style={styles.coinFarmerCard}>
      <LinearGradient
        style={styles.coinFarmerGradient}
        colors={['#FFD700', '#FFA500', '#FF8C00']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.coinFarmerContent}>
          <View style={styles.headerSection}>
            <Animated.View style={coinAnimatedStyle}>
              <CoinSvg width={36} height={36} />
            </Animated.View>
            <View style={styles.titleSection}>
              <EQText style={styles.coinFarmerTitle}>Coin Farmer</EQText>
              <EQText style={styles.coinFarmerSubtitle}>
                Level {currentLevel} • {farmingRate} coins/hr
              </EQText>
            </View>
          </View>

          <View style={styles.storageSection}>
            <View style={styles.storageHeader}>
              <EQText style={styles.storageText}>Storage</EQText>
              <EQText style={styles.storageAmount}>
                {formatCoinCount(storedCoins)} / {formatCoinCount(maxStorage)}
              </EQText>
            </View>
            <View style={styles.storageBarContainer}>
              <View style={styles.storageBar}>
                <LinearGradient
                  style={[styles.storageFill, {width: `${storagePercentage}%`}]}
                  colors={['#FFD700', '#FFA500']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.collectButton}
              onPress={handleCollect}
              sound={SOUNDS.BUTTON_CLICK}
              disabled={storedCoins === 0}>
              <LinearGradient
                style={styles.collectButtonGradient}
                colors={['#4CAF50', '#2E7D32']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <EQText style={styles.collectButtonText}>Collect</EQText>
                <CoinSvg width={16} height={16} />
                <EQText style={styles.collectButtonText}>
                  {formatCoinCount(storedCoins)}
                </EQText>
              </LinearGradient>
            </Pressable>

            <Pressable
              style={styles.collectDoubleButton}
              onPress={handleCollectDouble}
              sound={SOUNDS.BUTTON_CLICK}
              disabled={storedCoins === 0}>
              <LinearGradient
                style={styles.collectDoubleButtonGradient}
                colors={['#FF9800', '#E65100']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <EQText style={styles.collectDoubleButtonText}>
                  Collect 2x
                </EQText>
                <CoinSvg width={16} height={16} />
                <EQText style={styles.collectDoubleButtonText}>
                  {formatCoinCount(storedCoins * 2)}
                </EQText>
                <View style={styles.watchAdContainer}>
                  <MaterialIcons
                    name="video-collection"
                    size={18}
                    color={colors.white}
                  />
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  coinFarmerCard: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    borderColor: `${colors.white}30`,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  coinFarmerGradient: {
    padding: 20,
    borderRadius: 12,
  },
  coinFarmerContent: {
    gap: 20,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  titleSection: {
    flex: 1,
  },
  coinFarmerTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 2,
  },
  coinFarmerSubtitle: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  storageSection: {
    gap: 8,
  },
  storageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageText: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  storageAmount: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
  },
  storageBarContainer: {
    width: '100%',
  },
  storageBar: {
    height: 8,
    backgroundColor: `${colors.white}20`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  storageFill: {
    height: '100%',
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  collectButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  collectButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  collectButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  collectDoubleButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  collectDoubleButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  collectDoubleButtonText: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  watchAdContainer: {
    position: 'absolute',
    right: -8,
    top: -8,
    padding: 4,
    backgroundColor: colors.black,
    borderRadius: 12,
  },
});
